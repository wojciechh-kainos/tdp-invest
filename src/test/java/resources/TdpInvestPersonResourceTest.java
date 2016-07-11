package resources;

import com.google.inject.Guice;
import com.google.inject.Inject;
import configuration.DummyTestModule;
import framework.BaseTest;
import org.junit.Before;
import org.junit.Test;
import services.DummyJob;
import services.FirstImplementation;
import services.SecondImplementation;

import static org.junit.Assert.assertTrue;

/**
 * Created by mateuszpi on 11/07/16.
 */
public class TdpInvestPersonResourceTest extends BaseTest {
    @Inject
    DummyJob job;
TdpInvestPersonResource resource;

@Before
public void initialize(){
    resource = injector.getInstance(TdpInvestPersonResource.class);
}

    @Test
    public void baseTestShouldInject(){
        assertTrue(job instanceof FirstImplementation);
    }

    @Test
    public void testShouldFail(){
        assertTrue(resource.getJob() instanceof FirstImplementation);
    }
}
