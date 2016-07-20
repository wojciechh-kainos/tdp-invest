package e2e;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.util.concurrent.TimeUnit;

public class RegisterPage extends BasePage {

    private String PATH = "register";
    private By username = By.id("username");
    private By password = By.id("password");
    private By registerButton = By.id("registerButton");
    private By errorAlert = By.id("errorAlert");

    public void open() {
        this.driver.get(BASE_PATH + PATH);
    }

    public void register(String username, String password){
        driver.findElement(this.username).sendKeys(username);
        driver.findElement(this.password).sendKeys(password);
        driver.findElement(this.registerButton).click();
    }

    public Boolean isErrorVisible(){
        return super.isErrorVisible(this.errorAlert);
    }
}
