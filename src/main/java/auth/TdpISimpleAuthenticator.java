package auth;


import DAO.TdpIUserDAO;
import com.google.common.base.Optional;
import com.google.inject.Inject;
import domain.TdpIUser;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;
import io.dropwizard.hibernate.UnitOfWork;


public class TdpISimpleAuthenticator implements Authenticator<BasicCredentials, TdpIUser> {

	private TdpIUserDAO userDAO;

	@Inject
	public TdpISimpleAuthenticator(TdpIUserDAO userDAO) {
		this.userDAO = userDAO;
	}

	@Override
	@UnitOfWork
	public Optional<TdpIUser> authenticate(BasicCredentials credentials)
			throws AuthenticationException {

		TdpIUser user = userDAO.findByUsername(credentials.getUsername());

		if (user == null || !user.getPassword().equals(credentials.getPassword())) {
			throw new AuthenticationException("Login error!");
		}

		return Optional.fromNullable(user);
	}
}