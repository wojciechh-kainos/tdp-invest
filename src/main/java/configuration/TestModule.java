package configuration;

import com.google.inject.AbstractModule;
import services.DummyJob;
import services.SecondImplementation;

public class TestModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(DummyJob.class).to(SecondImplementation.class);
    }
}
