package dao;

import auth.TdpInvestPasswordStore;
import com.google.inject.Inject;
import domain.TdpUser;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;


public class TdpUserDAO extends AbstractDAO<TdpUser> {

    private final TdpInvestPasswordStore passwordStore;

    private final SessionFactory sessionFactory;

    @Inject
    public TdpUserDAO(SessionFactory sessionFactory, TdpInvestPasswordStore passwordStore) {
        super(sessionFactory);
        this.sessionFactory = sessionFactory;
        this.passwordStore = passwordStore;
    }

    public TdpUser findById(Long id) {
        return get(id);
    }

    public TdpUser getUserByEmail(String email) {
        Session session = sessionFactory.openSession();

        Criteria criteria = session.createCriteria(TdpUser.class)
                .add(Restrictions.eq("mail", email));

        TdpUser user = uniqueResult(criteria);

        session.close();

        return user;
    }

    public long create(TdpUser user) {
        try {
            user.setPassword(passwordStore.createHash(user.getPassword()));
            return persist(user).getId();
        } catch (TdpInvestPasswordStore.CannotPerformOperationException e) {
            e.printStackTrace();
            return -1;
        }
    }

}
