package e2e;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class RegisterPage extends BasePage {

    public RegisterPage() {
        super();
        path = "register";
    }



    public WebElement getUsernameField() {
        return driver.findElement(By.id("username"));
    }

    public WebElement getPasswordField() {
        return driver.findElement(By.id("password"));
    }

    public WebElement getRegisterButton() {
        return driver.findElement(By.id("registerButton"));
    }

    public WebElement getErrorAlert() {
        return driver.findElement(By.id("errorAlert"));
    }

    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
}
