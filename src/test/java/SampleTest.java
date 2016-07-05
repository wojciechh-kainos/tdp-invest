import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;

public class SampleTest {
    private ChromeDriver chromeDriver;
    private String pageUrl = "http://localhost:8080/#/tdp";

    public SampleTest() {
        System.setProperty("webdriver.chrome.driver", "/Users/wojciechh/chromedriver");
        chromeDriver = new ChromeDriver();
    }

    @Test
    public void openApplication() {
        chromeDriver.get(pageUrl);
        Assert.assertTrue(chromeDriver.findElements(By.tagName("div")).size() > 0 );
    }
}
