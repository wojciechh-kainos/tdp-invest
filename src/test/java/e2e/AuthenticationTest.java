package e2e;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.support.ui.WebDriverWait;

import static junit.framework.TestCase.assertTrue;

public class AuthenticationTest {

    public static final String VALID_USERNAME = "test2";
    public static final String VALID_PASSWORD = "test2";

    public static final String INVALID_USERNAME = "test1";
    public static final String INVALID_PASSWORD = "test1";

    private static LoginPage loginPage;
    private static RegisterPage registerPage;




    @Before
    public void setUp(){
        registerPage = new RegisterPage(WebDriverProvider.getDriver());
        loginPage = new LoginPage(WebDriverProvider.getDriver());
    }

    @Test
    public void testRegisterAndValidLogin() throws InterruptedException {
        registerPage.open();
        registerPage.register(VALID_USERNAME, VALID_PASSWORD);

        loginPage.open();
        loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        assertTrue("When login with correct credentials, user is redirected to tdp.",loginPage.isRedirected());

        Thread.sleep(2000);
        registerPage.open();
        registerPage.register(VALID_USERNAME, VALID_PASSWORD);

        Thread.sleep(2000);
        assertTrue("When register with already used credentials, the error message should become visible",registerPage.isErrorVisible());
    }

    @Test
    public void testInvalidLogin(){
        loginPage.open();
        loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);
        assertTrue("When login with bad credentials, the error message should become visible",loginPage.isErrorVisible());
    }

    @AfterClass
    public static void tearDown(){
        loginPage.close();
    }
}
