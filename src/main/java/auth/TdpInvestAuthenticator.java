package auth;


import model.User;

import javax.security.sasl.AuthenticationException;
import java.util.Optional;

public class TdpInvestAuthenticator implements Authenticator<BasicCredentials, User> {
        @Override
        public Optional<User> authenticate(BasicCredentials credentials) throws AuthenticationException {
            if ("secret".equals(credentials.getPassword())) {
                return Optional.of(new User(credentials.getUsername()));
            }
            return Optional.absent();
        }
    }
