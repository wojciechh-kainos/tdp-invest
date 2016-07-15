package resources;

import domain.TdpIUser;
import io.dropwizard.auth.Auth;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestAuthResource {

	@GET
	@Path("/login")
	public Response login(@Auth TdpIUser user) {
		return Response.ok().entity("You got permission!").build();
	}

	@POST
	@Path("/register")
	public Response register(TdpIUser user) {
		return Response.ok().entity("You got permission!").build();
	}
}