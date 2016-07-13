package auth;

import com.google.common.base.Optional;
import com.google.inject.Inject;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;
import domain.TdpUser;
import dao.TdpUserDAO;

public class TdpInvestAuthenticator implements Authenticator<BasicCredentials, TdpUser> {

    private final TdpUserDAO userDao;

    @Inject
    public TdpInvestAuthenticator(final TdpUserDAO userDao) {
        this.userDao = userDao;
    }

    @Override
    public Optional<TdpUser> authenticate(BasicCredentials credentials) throws AuthenticationException {
        TdpUser user = userDao.getUserByEmail(credentials.getUsername());

        if (user != null && user.getPassword().equals(credentials.getPassword())) {
            return Optional.of(user);
        }
        return Optional.absent();
    }
}