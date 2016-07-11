package resources;

import framework.BaseTest;
import org.junit.Before;
import org.junit.Test;
import services.SecondImplementation;
import static org.junit.Assert.assertTrue;

public class TdpInvestPersonResourceTest extends BaseTest {

    private TdpInvestPersonResource resource;

    @Before
    public void initialize() {
        resource = injector.getInstance(TdpInvestPersonResource.class);
    }

    @Test
    public void testShouldInject() {
        assertTrue(resource.getJob() instanceof SecondImplementation);
    }
}
