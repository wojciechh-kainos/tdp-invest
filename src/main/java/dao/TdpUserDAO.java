package dao;

import auth.TdpInvestPasswordStore;
import com.google.inject.Inject;
import domain.TdpUser;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import java.time.ZonedDateTime;
import java.util.UUID;


public class TdpUserDAO extends AbstractDAO<TdpUser> {

    private final TdpInvestPasswordStore passwordStore;

    @Inject
    public TdpUserDAO(SessionFactory sessionFactory, TdpInvestPasswordStore passwordStore) {
        super(sessionFactory);
        this.passwordStore = passwordStore;
    }

    public TdpUser findById(Long id) {
        return get(id);
    }

    public TdpUser getUserByEmail(String email) {
        Criteria criteria = currentSession().createCriteria(TdpUser.class)
                .add(Restrictions.eq("mail", email));
        return uniqueResult(criteria);
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

    public String refreshToken(TdpUser user) {
        ZonedDateTime newTokenExpire = user.getTokenExpire().plusMinutes(10);
        user.setTokenExpire(newTokenExpire);
        return persist(user).getToken();
    }

    public String generateToken(TdpUser user) throws TdpInvestPasswordStore.CannotPerformOperationException {
        user.setTokenExpire(ZonedDateTime.now().plusMinutes(10));
        String token = UUID.randomUUID().toString() + user.getTokenExpire() + user.getMail();
        user.setToken(passwordStore.createHash(token).substring(21));
        return persist(user).getToken();
    }
}
