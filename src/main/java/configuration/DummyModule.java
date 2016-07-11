package configuration;

import com.google.inject.AbstractModule;
import services.FirstImplementation;
import services.DummyJob;
import services.SecondImplementation;

/**
 * Created by mateuszpi on 11/07/16.
 */
public class DummyModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(DummyJob.class).to(SecondImplementation.class);

    }


}
