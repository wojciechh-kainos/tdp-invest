package e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class LoginPage extends BasePage {

    public LoginPage() throws Exception {
        super();
        path = "login";
        uniqueId = "loginPageUnique";
    }

    public WebElement getUsernameField() {
        return driver.findElement(By.id("username"));
    }

    public WebElement getPasswordField() {
        return driver.findElement(By.id("password"));
    }

    public WebElement getLoginButton() {
        return driver.findElement(By.id("loginButton"));
    }

    public WebElement getErrorAlert() {
        return driver.findElement(By.id("errorAlert"));
    }

    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
}
