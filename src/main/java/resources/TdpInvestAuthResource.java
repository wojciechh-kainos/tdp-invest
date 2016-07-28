package resources;

import DAO.TdpIUserDAO;
import auth.TdpIAuthenticator;
import com.google.inject.Inject;
import domain.TdpIUser;
import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.basic.BasicCredentials;
import io.dropwizard.hibernate.UnitOfWork;
import org.hibernate.HibernateException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/auth")
public class TdpInvestAuthResource {
	private TdpIUserDAO userDAO;
	private TdpIAuthenticator authenticator;

	@Inject
	public TdpInvestAuthResource(TdpIUserDAO userDAO, TdpIAuthenticator authenticator) {
		this.userDAO = userDAO;
		this.authenticator = authenticator;
	}

	@POST
	@Path("/login")
	@UnitOfWork
	public Response login(TdpIUser user) throws AuthenticationException {
		if (authenticator.authenticate(new BasicCredentials(user.getName(), user.getPassword())).isPresent()) {
			return Response.status(Response.Status.ACCEPTED).build();
		} else {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
	}

	@DELETE
	@Path("/delete/{username}")
	@UnitOfWork
	public Response delete(@PathParam("username") String username) {
		userDAO.deleteByUsername(username);
		return Response.status(Response.Status.OK).build();

	}

	@GET
	@Path("/valid")
	public String valid(@Auth TdpIUser tdpUser) throws AuthenticationException {
		return "SUCCESS";
	}

	@POST
	@Path("/register")
	@UnitOfWork
	@Consumes(MediaType.APPLICATION_JSON)
	public Response register(TdpIUser user) {
		try {
			userDAO.create(user);
			return Response.status(Response.Status.CREATED).build();
		} catch (HibernateException e) { // user already exists in a database
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
}