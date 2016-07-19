package e2e;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import java.util.concurrent.TimeUnit;

public class LoginPage extends BasePage{

    private String PATH = "login";
    private By username = By.id("username");
    private By password = By.id("password");
    private By loginButton = By.id("loginButton");
    private By errorAlert = By.id("errorAlert");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    @Override
    public void open() {
        String url = BASE_PATH + PATH;
        this.driver.get(url);
    }

    public void login(String username, String password){
        driver.findElement(this.username).sendKeys(username);
        driver.findElement(this.password).sendKeys(password);
        driver.findElement(this.loginButton).click();
    }

    public Boolean isErrorVisible(){
        return !driver.findElement(this.errorAlert).getCssValue("display").equals("none");
    }

    public boolean isRedirected() {
        return driver.getCurrentUrl().equals(BASE_PATH + PATH);
    }
}
