package e2e;


import org.openqa.selenium.WebDriver;

public abstract class BasePage {

        protected final String BASE_PATH  = "http://localhost:9000/#/";
        protected WebDriver driver;


        public BasePage(WebDriver driver){
            this.driver = driver;
        }

        public abstract void open();

        public abstract void close();
}
