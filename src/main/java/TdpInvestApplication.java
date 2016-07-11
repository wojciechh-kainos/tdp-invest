import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import configuration.TdpInvestApplicationConfiguration;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import resources.TdpInvestMainResource;
import resources.TdpInvestPersonResource;


public class TdpInvestApplication extends Application<TdpInvestApplicationConfiguration> {

    @Override
    public void initialize(Bootstrap<TdpInvestApplicationConfiguration> bootstrap) {
        bootstrap.addBundle(new FileAssetsBundle("src/main/resources/assets", "/", "index.html"));
    }

    @Override
    public void run(TdpInvestApplicationConfiguration configuration, Environment environment) {
        environment.jersey().register(new TdpInvestPersonResource());
        environment.jersey().register(new TdpInvestMainResource());
    }

    public static void main(final String[] args) throws Exception {
        new TdpInvestApplication().run(args);
    }

}
