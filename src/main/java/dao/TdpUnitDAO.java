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

    public List<TdpUnit> findAll() {
        return list(namedQuery("TdpUnit.findAll"));
    }

    public List<TdpUnit> getData() {
        return list(namedQuery("TdpUnit.onlyData"));
    }

    public List<TdpUnit> selectData(Long id, Date dateStart, Date dateEnd) {
        Query query = namedQuery("TdpUnit.selectDate");
        query.setLong("fund_id", id);
        query.setDate("date_start", dateStart);
        query.setDate("date_end", dateEnd);
        return list(query);
    }

    public List<TdpUnit> getFundUnits(Long id) {
        Query query = namedQuery("TdpUnit.getUnits");
        query.setLong("fund", id);
        return list(query);
    }
}
