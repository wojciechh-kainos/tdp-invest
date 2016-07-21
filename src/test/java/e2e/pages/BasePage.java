package e2e.pages;

import e2e.WebDriverProvider;
import e2e.config.ConfigParser;
import e2e.config.TestConfiguration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public abstract class BasePage {
    private TestConfiguration configuration  = ConfigParser.parseTestConfigFile();
    protected WebDriver driver;
    protected final String BASE_PATH = configuration.getDefaultUrl();

    public BasePage() throws Exception {
        this.driver = WebDriverProvider.getDriver();
    }

    public void open() {
        this.driver.get(getFullUrl());
    }

    public void close() {
        this.driver.close();
    }

    public abstract String getPartialUrl();

    public abstract String getUniqueId();

    public void waitForElementToLoad(By by){
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.presenceOfElementLocated(by));
    }

    public void waitForElementToShow(WebElement by){
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.visibilityOf(by));
    }

    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }

    protected String getFullUrl() {
        return BASE_PATH + getPartialUrl();
    }
}
