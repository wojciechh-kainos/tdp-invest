package auth;


import DAO.TdpIUserDAO;
import com.google.common.base.Optional;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import domain.TdpIUser;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;
import io.dropwizard.hibernate.UnitOfWork;


@Singleton
public class TdpIAuthenticator implements Authenticator<BasicCredentials, TdpIUser> {

	private TdpIUserDAO userDAO;

	@Inject
	public TdpIAuthenticator(TdpIUserDAO userDAO) {
		this.userDAO = userDAO;
	}

	@Override
	@UnitOfWork
	public Optional<TdpIUser> authenticate(BasicCredentials credentials)
			throws AuthenticationException {

		TdpIUser user = userDAO.findByUsername(credentials.getUsername());

		if (user != null && !user.getPassword().equals(credentials.getPassword())) {
			user = null;
		}

		return Optional.fromNullable(user);
	}
}