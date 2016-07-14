package framework;

import com.google.inject.Guice;
import com.google.inject.Injector;

import org.junit.BeforeClass;

public class BaseTest {

    private static Injector injector;

    public Injector getInjector() {
        return injector;
    }

    @BeforeClass
    public static void createInjector() {
      //  injector = Guice.createInjector(new DataResourceModule());
    }
}
