package resources;

import io.dropwizard.auth.Auth;
import model.User;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("/login")
@Consumes(MediaType.APPLICATION_JSON)
public class TdpInvestAuthResource {

    @GET
    public String login(@Auth User user) {
        return "test";
    }

}
