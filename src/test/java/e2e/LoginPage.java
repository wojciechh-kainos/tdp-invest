package e2e;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage extends BasePage{

    private String PATH = "login";
    private By username = By.id("username");
    private By password = By.id("password");
    private By loginButton = By.id("loginButton");
    private By errorAlert = By.id("errorAlert");

    public void open() {
        super.open(PATH);
    }

    public void login(String username, String password){
        insertText(this.username, username); // consider further encapsulation
        insertText(this.password, password);
        clickElement(this.loginButton);
    }


    public Boolean isErrorVisible(){
        return super.isErrorVisible(this.errorAlert);
    }

    public Boolean isRedirected() {
        return super.isRedirected(PATH);
    }
}
