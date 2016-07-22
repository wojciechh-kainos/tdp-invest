package e2e.pages;

public class FrontPage extends BasePage {

    public FrontPage() throws Exception {
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
}
