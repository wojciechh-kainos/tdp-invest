package e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class DashboardPage extends BasePage {

    public DashboardPage() throws Exception {
        super();
    }

    @Override
    public String getPartialUrl() {
        return "#/tdp/dashboard?id=1";
    }

    @Override
    public String getUniqueId() {
        return "loginPageContent";
    }

    public WebElement getChartDiv() {
        return driver.findElement(By.id("chart1"));
    }

}
