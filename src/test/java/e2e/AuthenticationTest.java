package e2e;

import e2e.pages.LoginPage;
import e2e.pages.RegisterPage;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import e2e.config.DatabaseHelper;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertFalse;

public class AuthenticationTest {

    public static final String VALID_TEST_CREDENTIAL = "test";
    public static final String INVALID_TEST_CREDENTIAL = "test2";
    private static LoginPage loginPage;
    private static RegisterPage registerPage;
    private static DatabaseHelper databaseHelper;

    @Before
    public void setUp() throws Exception {
        cleanDatabase();
        registerPage = new RegisterPage();
        loginPage = new LoginPage();
    }

    @Test
    public void testRegisterAndValidLogin() throws InterruptedException {
        registerPage.open();
        registerPage.getUsernameField().sendKeys(VALID_TEST_CREDENTIAL);
        registerPage.getPasswordField().sendKeys(VALID_TEST_CREDENTIAL);
        registerPage.getRegisterButton().click();
        registerPage.waitForElementToLoad(By.id(loginPage.getUniqueId()));
        assertFalse("When user register with correct credentials, user is redirected to login page.", registerPage.getCurrentUrl().equals(registerPage.getPartialUrl()));

        registerPage.open();
        registerPage.getUsernameField().sendKeys(VALID_TEST_CREDENTIAL);
        registerPage.getPasswordField().sendKeys(VALID_TEST_CREDENTIAL);
        registerPage.getRegisterButton().click();

        registerPage.waitForElementToShow(registerPage.getErrorAlert());
        assertTrue("When user registers with already used credentials, the error message should become visible", registerPage.getErrorAlert().isDisplayed());
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
    }
}
