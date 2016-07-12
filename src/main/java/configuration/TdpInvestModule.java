package configuration;

import DAO.TdpIUnitDAO;
import com.google.inject.AbstractModule;
import com.google.inject.ProvisionException;
import com.google.inject.Singleton;
import com.google.inject.Provides;
import domain.TdpIUnit;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import org.hibernate.SessionFactory;
import services.DummyJob;
import services.FirstImplementation;

public class TdpInvestModule extends AbstractModule {

    private final HibernateBundle<TdpInvestApplicationConfiguration> hibernate;

    public TdpInvestModule(HibernateBundle<TdpInvestApplicationConfiguration> hibernate) {
        this.hibernate = hibernate;
    }

    @Override
    protected void configure() {
        bind(DummyJob.class).to(FirstImplementation.class);
        bind(TdpIUnitDAO.class).toInstance(new TdpIUnitDAO(hibernate.getSessionFactory()));
    }


}
