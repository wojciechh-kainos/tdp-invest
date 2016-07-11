package framework;

import com.google.inject.Guice;
import com.google.inject.Injector;
import configuration.DummyTestModule;
import org.junit.Before;
import org.junit.BeforeClass;

/**
 * Created by mateuszpi on 11/07/16.
 */
public class BaseTest {


protected Injector injector;
    @Before
public void setup(){
        injector = Guice.createInjector(new DummyTestModule());
        injector.injectMembers(this);
    }
}
