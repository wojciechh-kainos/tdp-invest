package e2e;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

public class WebDriverProvider {

    private static WebDriver driver = null;

    public static WebDriver getDriver() throws Exception {
        if(driver == null){
            try {
                System.setProperty("webdriver.chrome.driver", "chromedriver");
                driver = new ChromeDriver();
            }catch (Exception exception){
                throw new Exception("Selenium chromedriver has not been found in project root path.");
            }
            driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        }
        return driver;
    }

}
