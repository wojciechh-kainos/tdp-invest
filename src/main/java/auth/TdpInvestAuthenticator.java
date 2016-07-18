package auth;

import com.google.common.base.Optional;
import com.google.inject.Inject;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;
import domain.TdpUser;
import dao.TdpUserDAO;
import io.dropwizard.jersey.sessions.Session;

public class TdpInvestAuthenticator implements Authenticator<BasicCredentials, TdpUser> {

    private final TdpUserDAO userDao;

    private final TdpInvestPasswordStore passwordStore;

    @Inject
    public TdpInvestAuthenticator(TdpUserDAO userDao, TdpInvestPasswordStore passwordStore) {
        this.userDao = userDao;
        this.passwordStore = passwordStore;
    }

    @Override
    public Optional<TdpUser> authenticate(BasicCredentials credentials) throws AuthenticationException {
        TdpUser user = userDao.getUserByEmail(credentials.getUsername());
        System.out.println(credentials.getUsername() + " " + credentials.getPassword());

        try {
            if (user != null && passwordStore.verifyPassword(credentials.getPassword(), user.getPassword())) {
                return Optional.of(user);
            }
        } catch (TdpInvestPasswordStore.CannotPerformOperationException | TdpInvestPasswordStore.InvalidHashException e) {
            e.printStackTrace();
        }

        return Optional.absent();
    }
}
