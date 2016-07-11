package configuration;

import com.google.inject.AbstractModule;
import services.DummyJob;
import services.FirstImplementation;

public class TdpInvestModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(DummyJob.class).to(FirstImplementation.class);
    }


}
