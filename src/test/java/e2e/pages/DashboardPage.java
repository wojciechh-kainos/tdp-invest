package e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class DashboardPage extends BasePage {

    public static final By LOC_LINK_DASHBOARD_FIRST = By.xpath("//a[contains(@href, '#/tdp/dashboard?id=1')]");
    public static final By LOC_LINK_DASHBOARD_SECOND = By.xpath("//a[contains(@href, '#/tdp/dashboard?id=2')]");

    public DashboardPage() throws Exception {
        super();
    }

    @Override
    public String getPartialUrl() {
        return "#/tdp/home";
    }

    @Override
    public String getUniqueId() {
        return "loginPageContent";
    }

    public String getChartId() {
        return "chart1";
    }

    public WebElement getChartDiv() {
        return driver.findElement(By.id(getChartId()));
    }

    public WebElement getFirstLink() {
        return driver.findElement(LOC_LINK_DASHBOARD_FIRST);
    }

    public WebElement getSecondLink() {
        return driver.findElement(LOC_LINK_DASHBOARD_SECOND);
    }

}
