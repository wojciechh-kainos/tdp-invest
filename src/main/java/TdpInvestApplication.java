import auth.TdpInvestAuthenticator;
import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import com.hubspot.dropwizard.guice.GuiceBundle;
import configuration.TdpInvestApplicationConfiguration;
//import configuration.TestModule;
import configuration.TdpInvestModule;
import domain.TdpIUnit;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.forms.MultiPartBundle;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.migrations.DbCommand;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import resources.TdpInvestCompareResource;
import configuration.TdpInvestModule;
import domain.TdpUser;
import resources.TdpInvestAuthResource;
import resources.TdpInvestPersonResource;
import resources.TdpInvestUnitResource;


public class TdpInvestApplication extends Application<TdpInvestApplicationConfiguration> {

    private GuiceBundle<TdpInvestApplicationConfiguration> guiceBundle;

    private final HibernateBundle<TdpInvestApplicationConfiguration> hibernateBundle = new HibernateBundle<TdpInvestApplicationConfiguration>(TdpIUnit.class, TdpUser.class) {
        @Override
        public DataSourceFactory getDataSourceFactory(TdpInvestApplicationConfiguration configuration) {
            return configuration.getDataSourceFactory();
        }
    };

    private final MigrationsBundle<TdpInvestApplicationConfiguration> migrationsBundle = new MigrationsBundle<TdpInvestApplicationConfiguration>() {
        @Override
        public DataSourceFactory getDataSourceFactory(TdpInvestApplicationConfiguration configuration) {
            return configuration.getDataSourceFactory();
        }
    };

    private TdpInvestModule module = new TdpInvestModule();

    @Override
    public void initialize(Bootstrap<TdpInvestApplicationConfiguration> bootstrap) {
        bootstrap.addBundle(new FileAssetsBundle("src/main/resources/assets", "/", "index.html"));
        bootstrap.addBundle(hibernateBundle);
        bootstrap.addBundle(migrationsBundle);
        bootstrap.addBundle(new MultiPartBundle());

        guiceBundle = GuiceBundle.<TdpInvestApplicationConfiguration>newBuilder()
                .addModule(module)
                .setConfigClass(TdpInvestApplicationConfiguration.class)
                .build();
        bootstrap.addBundle(guiceBundle);
    }

    @Override
    public void run(TdpInvestApplicationConfiguration configuration, Environment environment) {
        module.setSessionFactory(hibernateBundle.getSessionFactory());

        environment.jersey().register(new AuthDynamicFeature(new BasicCredentialAuthFilter.Builder<TdpUser>()
                .setAuthenticator(guiceBundle.getInjector().getInstance(TdpInvestAuthenticator.class))
                .buildAuthFilter()));

        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestUnitResource.class));
        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestPersonResource.class));
        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestAuthResource.class));
        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestCompareResource.class));
    }

    public static void main(final String[] args) throws Exception {
        new TdpInvestApplication().run(args);
    }

}
