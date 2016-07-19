package e2e;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

public class WebDriverProvider {

    private static WebDriver driver = null;

    public static WebDriver getDriver(){
        if(driver == null){
            System.setProperty("webdriver.chrome.driver", "chromedriver");
            driver = new ChromeDriver();
            driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        }
        return driver;
    }

}
