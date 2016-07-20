package e2e;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public abstract class BasePage {

    protected final String BASE_PATH = "http://localhost:9000/#/";
    protected String path;
    protected WebDriver driver;


    public BasePage() {
        this.driver = WebDriverProvider.getDriver();
    }

    public void open() {
        String url = BASE_PATH + path;
        this.driver.get(url);
    }

    public void close() {
        this.driver.close();
    }

    public String getUrl() {
        return BASE_PATH + path;
    }

    public void waitForElementToLoad(By by){
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.presenceOfElementLocated(by));
    }

    public void waitForElementToShow(By by){
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.visibilityOfElementLocated(by));
    }

    public void waitForElementToShow(WebElement by){
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.visibilityOf(by));
    }
}
