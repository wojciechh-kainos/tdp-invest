import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import com.hubspot.dropwizard.guice.GuiceBundle;
import configuration.TdpInvestApplicationConfiguration;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import configuration.TdpInvestModule;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import resources.TdpInvestConvertResource;
import resources.TdpInvestInvestmentResource;
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

        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestPersonResource.class));

        environment.jersey().register(new TdpInvestInvestmentResource());
        environment.jersey().register(MultiPartFeature.class);
        environment.jersey().register(new TdpInvestConvertResource());
    }

    public static void main(final String[] args) throws Exception {
        new TdpInvestApplication().run(args);
    }

}