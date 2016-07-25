package e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class ComparePage extends BasePage {

    public static final By COMPARE_LINK = By.xpath("//a[contains(@href, '#/tdp/compare')]");

    public ComparePage() throws Exception {
        super();
    }

    @Override
    public String getPartialUrl() {
        return "#/tdp/compare";
    }

    @Override
    public String getUniqueId() {
        return "loginPageContent";
    }

    public String getChartId() {
        return "chart1";
    }

    public WebElement getStartDateField() {
        return driver.findElement(By.id("start_date"));
    }

    public WebElement getEndDateField() {
        return driver.findElement(By.id("end_date"));
    }

    public WebElement getInterestRateField() {
        return driver.findElement(By.id("interest_rate"));
    }

    public WebElement getCapitalizationIntervalField() {
        return driver.findElement(By.id("value_capitalization"));
    }

    public WebElement getAmountField() {
        return driver.findElement(By.id("value_investment"));
    }

    public WebElement getSendButton() {
        return driver.findElement(By.id("button1id"));
    }

    public WebElement getCompareElement() {
        return driver.findElement(COMPARE_LINK);
    }

}
