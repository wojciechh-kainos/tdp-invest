package auth;

import com.google.common.base.Optional;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;
import domain.TdpUser;
import DAO.TdpUserDAO;
import io.dropwizard.hibernate.UnitOfWork;

import java.time.ZonedDateTime;

@Singleton
public class TdpInvestAuthenticator implements Authenticator<BasicCredentials, TdpUser> {

    private final TdpUserDAO userDao;

    private final TdpInvestPasswordStore passwordStore;

    @Inject
    public TdpInvestAuthenticator(TdpUserDAO userDao, TdpInvestPasswordStore passwordStore) {
        this.userDao = userDao;
        this.passwordStore = passwordStore;
    }

    @Override
    @UnitOfWork
    public Optional<TdpUser> authenticate(BasicCredentials credentials) throws AuthenticationException {
        TdpUser user = userDao.getUserByEmail(credentials.getUsername());

        try {
            if (user != null) {
                if (credentials.getPassword().equals(user.getToken()) && ZonedDateTime.now().isBefore(user.getTokenExpire())) {
                    userDao.refreshToken(user);
                    return Optional.of(user);
                } else if (passwordStore.verifyPassword(credentials.getPassword(), user.getPassword())) {
                    userDao.generateToken(user);
                    return Optional.of(user);
                }
            }
        } catch (TdpInvestPasswordStore.CannotPerformOperationException | TdpInvestPasswordStore.InvalidHashException e) {
            e.printStackTrace();
        }

        return Optional.absent();
    }
}
