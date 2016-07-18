package dao;


import com.google.inject.Inject;
import domain.TdpFund;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.List;

public class TdpFundDAO extends AbstractDAO<TdpFund> {

    @Inject
    public TdpFundDAO(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public TdpFund findById(Long id) {
        return get(id);
    }

    public long create(TdpFund fund) {
        return persist(fund).getId();
    }

    public List<TdpFund> findAll() {
        return list(namedQuery("tdpIFund.findAll"));
    }
}
