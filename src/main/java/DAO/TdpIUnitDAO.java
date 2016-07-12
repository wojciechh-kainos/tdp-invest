package DAO;


import domain.TdpIUnit;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.List;

public class TdpIUnitDAO extends AbstractDAO<TdpIUnit> {

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
		return list(namedQuery("domain.TdpIUnit.findAll"));
	}
}
