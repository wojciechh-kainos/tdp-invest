package resources;

import auth.TdpInvestAuthenticator;
import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.basic.BasicCredentials;
import model.User;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import com.google.common.base.Optional;

@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
public class TdpInvestAuthResource {

    @GET
    @Path("/valid")
    public String valid(@Auth User user) throws AuthenticationException {
        return "SUCCESS";
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public String login(User user) throws AuthenticationException {
        TdpInvestAuthenticator auth = new TdpInvestAuthenticator();
        // TODO: add char array for password
        Optional<User> res = auth.authenticate(new BasicCredentials(user.getName(), user.getName()));

        if (res.isPresent()) {
            return "SUCCESS";
        } else {
            return "Unable to log in with those credentials!";
        }
    }

}
