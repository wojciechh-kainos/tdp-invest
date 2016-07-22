package e2e.config;

public final class TestConfiguration {
    private String defaultUrl;

    public String getDefaultUrl() {
        return defaultUrl;
    }

    public void setDefaultUrl(String defaultUrl) {
        this.defaultUrl = defaultUrl;
    }

    private String webDriver;

    public String getWebDriver() {
        return webDriver;
    }

    public void setWebDriver(String webDriver) {
        this.webDriver = webDriver;
    }

    private String webDriverProperty;

    public String getWebDriverProperty() {
        return webDriverProperty;
    }

    public void setWebDriverProperty(String webDriverProperty) {
        this.webDriverProperty = webDriverProperty;
    }

    private String apiUrl;

    public String getApiUrl() { return apiUrl; }

    public void setApiUrl(String apiUrl) {  this.apiUrl = apiUrl; }
}
