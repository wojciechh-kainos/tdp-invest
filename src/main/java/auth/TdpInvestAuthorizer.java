package auth;

import domain.TdpUser;
import io.dropwizard.auth.Authorizer;

public class TdpInvestAuthorizer implements Authorizer<TdpUser> {

    @Override
    public boolean authorize(TdpUser user, String role) {
        String userEmail = user.getMail();
        String userRole = user.getRole();

        return userEmail.equals("test@test.pl") && role.equals(userRole);
    }

}
