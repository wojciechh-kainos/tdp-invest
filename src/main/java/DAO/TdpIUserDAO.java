package DAO;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import domain.TdpIUser;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;


public class TdpIUserDAO extends AbstractDAO<TdpIUser> {
	@Inject
	public TdpIUserDAO(SessionFactory sessionFactory) {
		super(sessionFactory);
	}

	public TdpIUser findById(Long id) {
		return get(id);
	}

	public long create(TdpIUser user) {
		return persist(user).getId();
	}

	public TdpIUser findByUsername(String username) {
		return uniqueResult(namedQuery("TdpIUser.findByUsername").setParameter("username", username));
	}
	public int deleteByUsername(String username) {
		return namedQuery("TdpIUser.deleteByUsername").setParameter("username", username).executeUpdate();
	}
}
