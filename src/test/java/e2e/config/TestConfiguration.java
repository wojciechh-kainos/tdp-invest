package e2e.config;

public final class TestConfiguration {
	private String defaultUrl;
	private String webDriver;
	private String webDriverProperty;
	private String apiUrl;

	public String getDefaultUrl() {
		return defaultUrl;
	}

	public void setDefaultUrl(String defaultUrl) {
		this.defaultUrl = defaultUrl;
	}


	public String getWebDriver() {
		return webDriver;
	}

	public void setWebDriver(String webDriver) {
		this.webDriver = webDriver;
	}


	public String getWebDriverProperty() {
		return webDriverProperty;
	}

	public void setWebDriverProperty(String webDriverProperty) {
		this.webDriverProperty = webDriverProperty;
	}


	public String getApiUrl() { return apiUrl; }

	public void setApiUrl(String apiUrl) {  this.apiUrl = apiUrl; }
}