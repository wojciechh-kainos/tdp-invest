import auth.TdpInvestAuthenticator;
import auth.TdpInvestPasswordStore;
import auth.TdpInvestUnauthorizedHandler;
import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import com.hubspot.dropwizard.guice.GuiceBundle;
import configuration.TdpInvestApplicationConfiguration;
import configuration.TdpInvestModule;
import dao.TdpUserDAO;
import domain.TdpIUnit;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.hibernate.UnitOfWorkAwareProxyFactory;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.forms.MultiPartBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import domain.TdpUser;
import resources.TdpInvestAuthResource;
import resources.TdpInvestUnitResource;
import resources.TdpUploadFileResource;


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
        bootstrap.addBundle(new FileAssetsBundle("src/main/resources/assets", "/", "index.html", "TdpInvest"));
        bootstrap.addBundle(new FileAssetsBundle("src/main/resources/assets/js/application/auth", "/auth/", "index.html", "Auth"));
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

        TdpInvestAuthenticator authenticator = new UnitOfWorkAwareProxyFactory(hibernateBundle).create(TdpInvestAuthenticator.class,
                new Class[]{TdpUserDAO.class, TdpInvestPasswordStore.class},
                new Object[]{guiceBundle.getInjector().getInstance(TdpUserDAO.class),
                        guiceBundle.getInjector().getInstance(TdpInvestPasswordStore.class)});

        environment.jersey().register(new AuthDynamicFeature(new BasicCredentialAuthFilter.Builder<TdpUser>()
                .setAuthenticator(authenticator)
                .setUnauthorizedHandler(guiceBundle.getInjector().getInstance(TdpInvestUnauthorizedHandler.class))
                .buildAuthFilter()));
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(TdpUser.class));

        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestUnitResource.class));
        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestAuthResource.class));
        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpUploadFileResource.class));
    }

    public static void main(final String[] args) throws Exception {
        new TdpInvestApplication().run(args);
    }

}
