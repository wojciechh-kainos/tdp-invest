package e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class RegisterPage extends BasePage {

    public RegisterPage() throws Exception {
        super();
    }

    @Override
    public String getPartialUrl() {
        return "#/register";
    }

    @Override
    public String getUniqueId() {
        return "registerPageContent";
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
}
