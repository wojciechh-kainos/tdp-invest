package configuration;

import com.google.inject.AbstractModule;
import services.DummyJob;
import services.FirstImplementation;
import services.SecondImplementation;

/**
 * Created by mateuszpi on 11/07/16.
 */
public class DummyTestModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(DummyJob.class).to(FirstImplementation.class);

    }


}
