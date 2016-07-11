package resources;

import model.User;

import javax.security.sasl.AuthenticationException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import java.util.Optional;


public class TdpInvestAuthResource {

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public UserAuthResponse login(User user) throws AuthenticationException {
        Optional<User> res = DropwizardApplication.getCachedAuthenticator()
                .authenticate(user.toCredentials());
        if ( res.isPresent() ) {
            return new UserAuthResponse(res.get());
        } else {
            throw new MessageWrappedException("Unable to log in with those credentials!");
        }
    }

}
