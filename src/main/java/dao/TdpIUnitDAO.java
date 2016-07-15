package dao;

import com.google.inject.Inject;
import domain.TdpIUnit;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Query;
import org.hibernate.SessionFactory;

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

	public long create(TdpIUnit unit) {
		return persist(unit).getId();
	}

	public List<TdpIUnit> findAll() {
		return list(namedQuery("TdpIUnit.findAll"));
	}

	public List<TdpIUnit> getData() {
		return list(namedQuery("TdpIUnit.onlyData"));
	}

	public List<TdpIUnit> selectData(Long id, Date dateStart, Date dateEnd) {
		Query query = namedQuery("TdpIUnit.selectDate");
		query.setLong("fund_id", id);
		query.setDate("date_start", dateStart);
		query.setDate("date_end", dateEnd);
		return list(query);
	}

	public List<TdpIUnit> getFundUnits(Long id) {
		Query query = namedQuery("TdpIUnit.getUnits");
		query.setLong("fund", id);
		return list(query);
	}
}