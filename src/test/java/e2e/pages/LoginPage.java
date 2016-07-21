package e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class LoginPage extends BasePage {

    public LoginPage() throws Exception {
        super();
        path = "login";
    }

    @Override
    public String getUniqueId() {
        return "loginPageContent";
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
}
