package e2e;

import e2e.config.ConfigurationProvider;
import e2e.config.TestConfiguration;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

public class WebDriverProvider {

	private static WebDriver driver = null;

	public static WebDriver getDriver() throws Exception {
		if (driver == null) {
			try {
				TestConfiguration configuration = ConfigurationProvider.getConfig();
				System.setProperty(configuration.getWebDriver(), configuration.getWebDriverProperty());
				driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			} catch (Exception exception) {
				throw new Exception("Selenium chromedriver has not been found in project root path.");
			}
		}
		return driver;
	}

}