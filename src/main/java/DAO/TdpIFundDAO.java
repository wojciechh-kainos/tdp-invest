package DAO;


import com.google.inject.Inject;
import domain.TdpIFund;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.List;

public class TdpIFundDAO extends AbstractDAO<TdpIFund> {

    @Inject
    public TdpIFundDAO(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public TdpIFund findById(Long id) {
        return get(id);
    }

    public long create(TdpIFund fund) {
        return persist(fund).getId();
    }

    public List<TdpIFund> findAll() {
        return list(namedQuery("tdpIFund.findAll"));
    }
}
