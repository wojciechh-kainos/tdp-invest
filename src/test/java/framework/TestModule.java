package framework;

import com.google.inject.AbstractModule;

public class TestModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(DummyJob.class).to(SecondImplementation.class);
    }
}
