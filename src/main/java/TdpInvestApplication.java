import auth.TdpInvestAuthenticator;
import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import com.hubspot.dropwizard.guice.GuiceBundle;
import configuration.TdpInvestApplicationConfiguration;
import configuration.TdpInvestModule;
import domain.TdpIUnit;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.db.ManagedDataSource;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.migrations.DbCommand;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseConnection;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.DatabaseException;
import liquibase.exception.LiquibaseException;
import liquibase.resource.ClassLoaderResourceAccessor;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import resources.DataResource;
import configuration.TdpInvestModule;
import domain.TdpUser;
import resources.TdpInvestAuthResource;
import resources.TdpInvestPersonResource;
import resources.TdpInvestUnitResource;
import service.DateTransformer;
import service.FileTransformer;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class TdpInvestApplication extends Application<TdpInvestApplicationConfiguration> {

    private static final Logger logger = LogManager.getLogger(TdpInvestApplication.class);


    private GuiceBundle<TdpInvestApplicationConfiguration> guiceBundle;


    private final MigrationsBundle<TdpInvestApplicationConfiguration> migrationsBundle = new MigrationsBundle<TdpInvestApplicationConfiguration>() {
        @Override
        public DataSourceFactory getDataSourceFactory(TdpInvestApplicationConfiguration configuration) {
            return configuration.getDataSourceFactory();
        }
    };

    private final HibernateBundle<TdpInvestApplicationConfiguration> hibernateBundle = new HibernateBundle<TdpInvestApplicationConfiguration>(TdpIUnit.class, TdpUser.class) {
        @Override
        public DataSourceFactory getDataSourceFactory(TdpInvestApplicationConfiguration configuration) {
            return configuration.getDataSourceFactory();
        }
    };

    private TdpInvestModule module = new TdpInvestModule();

    @Override
    public void initialize(Bootstrap<TdpInvestApplicationConfiguration> bootstrap) {
        bootstrap.addBundle(new FileAssetsBundle("src/main/resources/assets", "/", "index.html"));
        bootstrap.addBundle(migrationsBundle);
        bootstrap.addBundle(hibernateBundle);

        guiceBundle = GuiceBundle.<TdpInvestApplicationConfiguration>newBuilder()
                .addModule(module)
                .setConfigClass(TdpInvestApplicationConfiguration.class)
                .build();
        bootstrap.addBundle(guiceBundle);
    }

    @Override
    public void run(TdpInvestApplicationConfiguration configuration, Environment environment) {
        module.setSessionFactory(hibernateBundle.getSessionFactory());
        environment.jersey().register(guiceBundle.getInjector().getInstance(DataResource.class));
        environment.jersey().register(new AuthDynamicFeature(new BasicCredentialAuthFilter.Builder<TdpUser>()
                .setAuthenticator(guiceBundle.getInjector().getInstance(TdpInvestAuthenticator.class))
                .buildAuthFilter()));
        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestUnitResource.class));
        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestPersonResource.class));
        environment.jersey().register(guiceBundle.getInjector().getInstance(TdpInvestAuthResource.class));
    }

    public static void main(final String[] args) throws Exception {
        FileTransformer tra = new FileTransformer();
        tra.transformFile();
        new TdpInvestApplication().run(args);
    }
}