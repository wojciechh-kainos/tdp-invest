import DAO.TdpIUserDAO;
import auth.TdpIAuthenticator;
import auth.TdpIAuthorizer;
import auth.TdpIUnauthorizedHandler;
import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import com.hubspot.dropwizard.guice.GuiceBundle;
import configuration.TdpInvestApplicationConfiguration;
import configuration.TdpInvestModule;
import domain.TdpIUnit;
import domain.TdpIUser;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.forms.MultiPartBundle;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.hibernate.UnitOfWorkAwareProxyFactory;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import resources.TdpInvestUnitResource;
import resources.TdpInvestAuthResource;


public class TdpInvestApplication extends Application<TdpInvestApplicationConfiguration> {

    private GuiceBundle<TdpInvestApplicationConfiguration> guiceBundle;

    private final HibernateBundle<TdpInvestApplicationConfiguration> hibernateBundle = new HibernateBundle<TdpInvestApplicationConfiguration>(TdpIUnit.class, TdpIUser.class) {
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

        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestUnitResource.class));
        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestAuthResource.class));


		TdpIAuthenticator authenticator = new UnitOfWorkAwareProxyFactory(hibernateBundle).create(TdpIAuthenticator.class,
				TdpIUserDAO.class, guiceBundle.getInjector().getInstance(TdpIUserDAO.class));

        environment.jersey().register(new AuthDynamicFeature(new BasicCredentialAuthFilter.Builder<TdpIUser>()
                .setAuthenticator(authenticator)
				.setAuthorizer(guiceBundle.getInjector().getInstance(TdpIAuthorizer.class))
                .setUnauthorizedHandler(new TdpIUnauthorizedHandler())
                .buildAuthFilter()));

        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(TdpIUser.class));
		environment.jersey().register(RolesAllowedDynamicFeature.class);


    }

    public static void main(final String[] args) throws Exception {
        new TdpInvestApplication().run(args);
    }

}
