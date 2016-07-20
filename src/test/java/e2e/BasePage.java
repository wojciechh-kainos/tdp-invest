package e2e;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public abstract class BasePage {

        protected final String BASE_PATH  = "http://localhost:9000/#/";
        protected WebDriver driver;


        public BasePage(){
                this.driver = WebDriverProvider.getDriver();
        }

        public void open(String path) {
                String url = BASE_PATH + path;
                this.driver.get(url);
        };

        public void close() {
                this.driver.close();
        }

        public boolean isErrorVisible(By element) {
                return !driver.findElement(element).getCssValue("display").equals("none");
        }

        public void insertText (By by, String text) {
                driver.findElement(by).sendKeys(text);
        }

        public void clickElement (By by) {
                driver.findElement(by).click();
        }

        public boolean isRedirected(String path) {
                return driver.getCurrentUrl().equals(BASE_PATH + path);
        }
}
