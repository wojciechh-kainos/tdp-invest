package e2e.pages;

public class FrontPage extends BasePage {

    public FrontPage() throws Exception {
        super();
    }

    @Override
    public String getPartialUrl() {
        return "tdp";
    }

    @Override
    public String getUniqueId() {
        return "dateRangeForm";
    }
}
