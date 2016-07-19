package e2e;

import org.openqa.selenium.WebDriver;

/**
 * Created by malgorzatas on 19/07/16.
 */
public class RegisterPage extends BasePage {

    private String REGISTER = "/register";

    public RegisterPage(WebDriver driver) {
        super(driver);
    }

    @Override
    public void open() {
        this.driver.get(BASE_PATH + REGISTER);
    }

}
