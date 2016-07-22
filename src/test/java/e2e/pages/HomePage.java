package e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class HomePage extends BasePage {

    public HomePage() throws Exception {
        super();
    }

    @Override
    public String getPartialUrl() {
        return "#/login";
    }

    @Override
    public String getUniqueId() {
        return "frontPageContent";
    }

    public WebElement getFundListElement() {
        return driver.findElement(By.className("list-group-item ng-binding ng-scope"));
    }
}
