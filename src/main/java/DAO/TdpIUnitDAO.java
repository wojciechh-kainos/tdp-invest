package DAO;

import com.google.inject.Inject;
import domain.TdpIDateRange;
import domain.TdpIUnit;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

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

    public void add(TdpIUnit unit) {
		currentSession().save(unit);
	}

	public List<TdpIUnit> findAllWithinRange(TdpIDateRange tdpIDateRange) {
		return list(namedQuery("TdpIUnit.findAllWithinRange").setParameter("minDate", tdpIDateRange.getMinDate()).setParameter("maxDate", tdpIDateRange.getMaxDate()));

	}
}
