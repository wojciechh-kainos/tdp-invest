package dao;

import com.google.inject.Inject;
import domain.TdpIUnit;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.Date;
import java.util.List;

public class TdpIUnitDAO extends AbstractDAO<TdpIUnit> {

	@Inject
	public TdpIUnitDAO(SessionFactory sessionFactory) {
		super(sessionFactory);
	}

	public TdpIUnit findById(Long id) {
		return get(id);
	}

	public void bulkAdd (List<TdpIUnit> tdpUnitList) {

		for (TdpIUnit unit : tdpUnitList) {
			persist(unit);
		}

	}

	public long create(TdpIUnit unit) {
		return persist(unit).getId();
	}

	public List<TdpIUnit> findAll() {
		return list(namedQuery("TdpIUnit.findAll"));
	}

	public List<TdpIUnit> getDate(Long id) {
		return list(namedQuery("TdpIUnit.getDate").setParameter("id", id));
	}

	public List<TdpIUnit> getDate(Date dateFrom, Date dateTo) {
		return list(namedQuery("TdpIUnit.getDataByDate").setParameter("dateFrom", dateFrom ).setParameter("dateTo", dateTo));
	}
}
