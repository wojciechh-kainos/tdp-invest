package e2e;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import static junit.framework.TestCase.assertTrue;

public class LoginTest {

    private static LoginPage loginPage;

    @Before
    public void setUp(){
        loginPage = new LoginPage(WebDriverProvider.getDriver());
    }

    @Test
    public void testLogin(){
        loginPage.open();
        loginPage.login("test", "test");
        assertTrue("When login with bad credentials, the error message should become visible",loginPage.isErrorVisible());
    }

    @AfterClass
    public static void tearDown(){
        loginPage.close();
    }
}
