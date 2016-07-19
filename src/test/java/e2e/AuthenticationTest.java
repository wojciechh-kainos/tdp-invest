package e2e;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import static junit.framework.TestCase.assertTrue;

public class AuthenticationTest {

    private static LoginPage loginPage;
    private static RegisterPage registerPage;

    @Before
    public void setUp(){
        registerPage = new RegisterPage(WebDriverProvider.getDriver());
        loginPage = new LoginPage(WebDriverProvider.getDriver());
    }

    @Test
    public void testRegisterAndValidLogin(){
        registerPage.open();
        registerPage.register("test2", "test2");

        loginPage.open();
        loginPage.login("test2", "test2");
        assertTrue("When login with correct credentials, user is redirected to tdp.",loginPage.isRedirected());
    }

    @Test
    public void testInvalidLogin(){
        loginPage.open();
        loginPage.login("test", "test");
        assertTrue("When login with bad credentials, the error message should become visible",loginPage.isErrorVisible());
    }

    @AfterClass
    public static void tearDown(){
        loginPage.close();
    }
}
