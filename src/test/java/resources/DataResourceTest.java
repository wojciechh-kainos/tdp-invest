package resources;

import framework.BaseTest;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import services.SecondImplementation;


import static org.junit.Assert.assertTrue;

public class DataResourceTest extends BaseTest {

    private DataResource resource;

    @Before
    public void initialize() {
        resource = getInjector().getInstance(DataResource.class);
    }

    @Test
    public void testShouldInject() {
        assertTrue(resource instanceof DataResource);
    }

    @Test
    public void someTest() {
    }

}
