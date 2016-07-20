package auth;

import com.google.inject.Singleton;
import domain.TdpIUser;
import io.dropwizard.auth.Authorizer;

@Singleton
public class TdpIAuthorizer implements Authorizer<TdpIUser> {
	@Override
	public boolean authorize(TdpIUser principal, String role) {
		return principal.getRole().toString().equals(role);
	}
}
