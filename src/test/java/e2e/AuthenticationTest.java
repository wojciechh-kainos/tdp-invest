package e2e;

import e2e.pages.*;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import e2e.config.DatabaseHelper;

import static e2e.pages.DashboardPage.LOC_LINK_DASHBOARD_FIRST;
import static e2e.pages.DashboardPage.LOC_LINK_DASHBOARD_SECOND;
import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertFalse;

public class AuthenticationTest {

    public static final String VALID_TEST_CREDENTIAL = "test";
    public static final String INVALID_TEST_CREDENTIAL = "test2";
    public static final String VALID_TEST_CREDENTIAL_DASHBOARD = "test_dash";
    public static final String VALID_TEST_CREDENTIAL_COMPARE = "test_compare";

    private static LoginPage loginPage;
    private static RegisterPage registerPage;
    private static HomePage homePage;
    private static DashboardPage dashboardPage;
    private static ComparePage comparePage;
    private static DatabaseHelper databaseHelper;

    @Before
    public void setUp() throws Exception {
        cleanDatabase();
        registerPage = new RegisterPage();
        loginPage = new LoginPage();
        homePage = new HomePage();
        dashboardPage = new DashboardPage();
        comparePage = new ComparePage();
    }

    public void setUpUser(String userName) {
        registerPage.open();
        registerPage.getUsernameField().sendKeys(userName);
        registerPage.getPasswordField().sendKeys(userName);
        registerPage.getRegisterButton().click();

        registerPage.waitForElementToLoad(By.id(loginPage.getUniqueId()));

        loginPage.open();
        loginPage.getUsernameField().sendKeys(userName);
        loginPage.getPasswordField().sendKeys(userName);
        loginPage.getLoginButton().click();

        loginPage.waitForElementToLoad(By.id(homePage.getUniqueId()));
        loginPage.waitForElementToLoad(LOC_LINK_DASHBOARD_FIRST);

    }

    @Test
    public void testRegisterAndValidLogin() throws InterruptedException {
        registerPage.open();
        registerPage.getUsernameField().sendKeys(VALID_TEST_CREDENTIAL);
        registerPage.getPasswordField().sendKeys(VALID_TEST_CREDENTIAL);
        registerPage.getRegisterButton().click();
        registerPage.waitForElementToLoad(By.id(loginPage.getUniqueId()));
        assertFalse("When user register with correct credentials, user is redirected to login page.", registerPage.getCurrentUrl().equals(registerPage.getPartialUrl()));

        loginPage.open();
        loginPage.getUsernameField().sendKeys(VALID_TEST_CREDENTIAL);
        loginPage.getPasswordField().sendKeys(VALID_TEST_CREDENTIAL);
        loginPage.getLoginButton().click();

        loginPage.waitForElementToLoad(By.id(homePage.getUniqueId()));
        assertFalse("When user logs in with correct credentials, user is redirected to tdp.", loginPage.getCurrentUrl().equals(loginPage.getPartialUrl()));

        registerPage.open();
        registerPage.getUsernameField().sendKeys(VALID_TEST_CREDENTIAL);
        registerPage.getPasswordField().sendKeys(VALID_TEST_CREDENTIAL);
        registerPage.getRegisterButton().click();

        registerPage.waitForElementToShow(registerPage.getErrorAlert());
        assertTrue("When user registers with already used credentials, the error message should become visible", registerPage.getErrorAlert().isDisplayed());
    }

    @Test
    public void testComparePage() throws Exception {
        setUpUser(VALID_TEST_CREDENTIAL_COMPARE);

        dashboardPage.getFirstLink().click();
        dashboardPage.waitForElementToLoad(By.id(dashboardPage.getChartId()));

        comparePage.getCompareElement().click();

        comparePage.waitForElementToLoad(By.id("compareForm"));

        comparePage.getStartDateField().sendKeys("1998-01-05");
        comparePage.getEndDateField().sendKeys("2016-05-12");
        comparePage.getInterestRateField().sendKeys("7");
        comparePage.getCapitalizationIntervalField().sendKeys("30");
        comparePage.getAmountField().sendKeys("10000");

        comparePage.getSendButton().click();

        comparePage.waitForElementToLoad(By.id(dashboardPage.getChartId()));
    }

    @Test
    public void testDashboardPage() throws Exception {
        setUpUser(VALID_TEST_CREDENTIAL_DASHBOARD);

        dashboardPage.getFirstLink().click();

        dashboardPage.waitForElementToLoad(By.id(dashboardPage.getChartId()));

        dashboardPage.open();
        dashboardPage.waitForElementToLoad(LOC_LINK_DASHBOARD_SECOND);
        dashboardPage.getSecondLink().click();
        dashboardPage.waitForElementToLoad(By.id(dashboardPage.getChartId()));

        assertTrue("When user select another link, chart should be visible", dashboardPage.getChartDiv().isDisplayed());
    }


    @Test
    public void testInvalidLogin() {
        loginPage.open();
        loginPage.getUsernameField().sendKeys(INVALID_TEST_CREDENTIAL);
        loginPage.getPasswordField().sendKeys(INVALID_TEST_CREDENTIAL);
        loginPage.getLoginButton().click();
        loginPage.waitForElementToShow(loginPage.getErrorAlert());
        assertTrue("When user logs in with bad credentials, the error message should become visible", loginPage.getErrorAlert().isDisplayed());
    }

    @AfterClass
    public static void tearDown() throws Exception {
        loginPage.close();
        cleanDatabase();
    }

    private static void cleanDatabase() throws Exception {
        databaseHelper = new DatabaseHelper();
        databaseHelper.deleteUser(INVALID_TEST_CREDENTIAL);
        databaseHelper.deleteUser(VALID_TEST_CREDENTIAL);
        databaseHelper.deleteUser(VALID_TEST_CREDENTIAL_DASHBOARD);
        databaseHelper.deleteUser(VALID_TEST_CREDENTIAL_COMPARE);
    }
}
