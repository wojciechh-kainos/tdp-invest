package resources;

import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;
import model.User;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


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
    public Response login(User user) throws AuthenticationException {

        if (user.getPassword().equals("secret")) {
            return Response.status(Response.Status.ACCEPTED).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

}
