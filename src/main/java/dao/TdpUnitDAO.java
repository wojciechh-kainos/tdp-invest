package dao;

import com.google.inject.Inject;
import domain.TdpUnit;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Query;
import org.hibernate.SessionFactory;

import java.util.Date;
import java.util.List;

public class TdpUnitDAO extends AbstractDAO<TdpUnit> {

    @Inject
    public TdpUnitDAO(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public TdpUnit findById(Long id) {
        return get(id);
    }

    public long create(TdpUnit unit) {
        return persist(unit).getId();
    }

    public List<TdpUnit> selectData(Long id) {
        Query query = namedQuery("TdpUnit.selectUnits");
        query.setLong("fund_id", id);
        return list(query);
    }

    public List<TdpUnit> selectData(Long id, Date dateStart, Date dateEnd) {
        Query query = namedQuery("TdpUnit.selectUnitsDate");
        query.setLong("fund_id", id);
        query.setDate("date_start", dateStart);
        query.setDate("date_end", dateEnd);
        return list(query);
    }
}
