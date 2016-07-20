package e2e;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertFalse;

public class AuthenticationTest {

    private static LoginPage loginPage;
    private static RegisterPage registerPage;


    @Before
    public void setUp() {
        registerPage = new RegisterPage();
        loginPage = new LoginPage();
    }

    @Test
    public void testRegisterAndValidLogin() throws InterruptedException {
        registerPage.open();
        registerPage.getUsernameField().sendKeys("test");
        registerPage.getPasswordField().sendKeys("test");
        registerPage.getRegisterButton().click();


        loginPage.open();
        loginPage.getUsernameField().sendKeys("test");
        loginPage.getPasswordField().sendKeys("test");
        loginPage.getLoginButton().click();

        Thread.sleep(2000);
        assertFalse("When user logs in with correct credentials, user is redirected to tdp.", loginPage.getCurrentUrl().equals(loginPage.getUrl()));

        registerPage.open();
        registerPage.getUsernameField().sendKeys("test");
        registerPage.getPasswordField().sendKeys("test");
        registerPage.getRegisterButton().click();

        Thread.sleep(2000);
        assertFalse("When user registers with already used credentials, the error message should become visible", registerPage.getErrorAlert().getCssValue("display").equals("none"));
    }

    @Test
    public void testInvalidLogin() {
        loginPage.open();
        loginPage.getUsernameField().sendKeys("test2");
        loginPage.getPasswordField().sendKeys("test2");
        loginPage.getLoginButton().click();
        assertFalse("When user logs in with bad credentials, the error message should become visible", loginPage.getErrorAlert().getCssValue("display").equals("none"));
    }

    @AfterClass
    public static void tearDown() {
        loginPage.close();
    }
}
