package framework;

import com.google.inject.Guice;
import com.google.inject.Injector;
import configuration.TestModule;
import org.junit.BeforeClass;

public class BaseTest {

    protected static Injector injector;

    @BeforeClass
    public static void createInjector() {
        injector = Guice.createInjector(new TestModule());
    }
}
