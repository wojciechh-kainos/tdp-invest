import DAO.TdpIUnitDAO;
import com.github.dirkraft.dropwizard.fileassets.FileAssetsBundle;
import configuration.TdpInvestApplicationConfiguration;
import domain.TdpIUnit;
import io.dropwizard.Application;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import resources.TdpInvestPersonResource;
import resources.TdpInvestUnitResource;


public class TdpInvestApplication extends Application<TdpInvestApplicationConfiguration> {
    private final HibernateBundle<TdpInvestApplicationConfiguration> hibernate = new HibernateBundle<TdpInvestApplicationConfiguration>(TdpIUnit.class) {
        @Override
        public DataSourceFactory getDataSourceFactory(TdpInvestApplicationConfiguration configuration) {
            return configuration.getDataSourceFactory();
        }
    };

    @Override
    public void initialize(Bootstrap<TdpInvestApplicationConfiguration> bootstrap) {
        bootstrap.addBundle(new FileAssetsBundle("src/main/resources/assets", "/", "index.html"));
        bootstrap.addBundle(hibernate);
    }

    @Override
    public void run(TdpInvestApplicationConfiguration configuration, Environment environment) {
        environment.jersey().register(new TdpInvestPersonResource());

        final TdpIUnitDAO dao = new TdpIUnitDAO(hibernate.getSessionFactory());
        environment.jersey().register(new TdpInvestUnitResource(dao));
    }

    public static void main(final String[] args) throws Exception {
        new TdpInvestApplication().run(args);
    }

}
