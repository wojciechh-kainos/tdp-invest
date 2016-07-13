package dao;


import com.google.inject.Inject;
import domain.TdpUser;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;


public class TdpUserDAO extends AbstractDAO<TdpUser> {

    @Inject
    public TdpUserDAO(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public TdpUser findById(Long id) {
        return get(id);
    }

    public TdpUser getUserByEmail(String email) {
        Criteria criteria = currentSession().createCriteria(TdpUser.class)
                .add(Restrictions.eq("mail", email));
        return uniqueResult(criteria);
    }

    public long create(TdpUser user) { return persist(user).getId(); }

}
