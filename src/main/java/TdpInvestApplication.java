import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import com.hubspot.dropwizard.guice.GuiceBundle;
import configuration.TdpInvestApplicationConfiguration;
import configuration.TestModule;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import resources.TdpInvestCompareResource;
import configuration.TdpInvestModule;
import resources.TdpInvestPersonResource;


public class TdpInvestApplication extends Application<TdpInvestApplicationConfiguration> {
        private GuiceBundle<TdpInvestApplicationConfiguration> guiceBundle;

    @Override
    public void initialize(Bootstrap<TdpInvestApplicationConfiguration> bootstrap) {
        bootstrap.addBundle(new FileAssetsBundle("src/main/resources/assets", "/", "index.html"));

        guiceBundle = GuiceBundle.<TdpInvestApplicationConfiguration>newBuilder()
                .addModule(new TdpInvestModule())
                .setConfigClass(TdpInvestApplicationConfiguration.class)
                .build();
        bootstrap.addBundle(guiceBundle);
    }

    @Override
    public void run(TdpInvestApplicationConfiguration configuration, Environment environment) {

        environment.jersey().register(new TdpInvestCompareResource());
        //dodajemy taką linię przy każdym endpoincie :)

        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestPersonResource.class));

    }

    public static void main(final String[] args) throws Exception {
        new TdpInvestApplication().run(args);
    }

}
