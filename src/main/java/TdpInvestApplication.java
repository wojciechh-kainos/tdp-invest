import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import configuration.TdpInvestApplicationConfiguration;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import model.User;
import resources.TdpInvestAuthResource;
import resources.TdpInvestPersonResource;


public class TdpInvestApplication extends Application<TdpInvestApplicationConfiguration> {

    @Override
    public void initialize(Bootstrap<TdpInvestApplicationConfiguration> bootstrap) {
        bootstrap.addBundle(new FileAssetsBundle("src/main/resources/assets", "/", "index.html"));
    }

    @Override
    public void run(TdpInvestApplicationConfiguration configuration, Environment environment) {
//        environment.jersey().register(new AuthDynamicFeature(
//                new BasicCredentialAuthFilter.Builder<User>()
//                        .setAuthenticator(new TdpInvestAuthenticator())
//                        .buildAuthFilter()));

        environment.jersey().register(new TdpInvestAuthResource());
        environment.jersey().register(new TdpInvestPersonResource());
    }

    public static void main(final String[] args) throws Exception {
        new TdpInvestApplication().run(args);
    }

}
