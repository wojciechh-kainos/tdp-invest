import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import com.hubspot.dropwizard.guice.GuiceBundle;
import configuration.TdpInvestApplicationConfiguration;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import module.TdpInvestApplicationModule;
import resources.TdpInvestPersonResource;


public class TdpInvestApplication extends Application<TdpInvestApplicationConfiguration>{

    private GuiceBundle<TdpInvestApplicationConfiguration> guiceBundle;


    @Override
    public void initialize(Bootstrap<TdpInvestApplicationConfiguration> bootstrap) {
        bootstrap.addBundle(new FileAssetsBundle("src/main/resources/assets", "/", "index.html"));

        guiceBundle = GuiceBundle.<TdpInvestApplicationConfiguration>newBuilder()
                .addModule(new TdpInvestApplicationModule())
                .setConfigClass(TdpInvestApplicationConfiguration.class)
                .build();

        bootstrap.addBundle(guiceBundle);
    }

    @Override
    public void run(TdpInvestApplicationConfiguration configuration, Environment environment) {
        environment.jersey().register(new TdpInvestPersonResource());
        //environment.lifecycle().manage(guiceBundle.getInjector().getInstance(TemplateHealthCheck.class));
    }

    public static void main(final String[] args) throws Exception {
        new TdpInvestApplication().run(args);
    }

}
