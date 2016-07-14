package resources;

import auth.TdpInvestAuthenticator;
import com.google.inject.Inject;
import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.basic.BasicCredentials;
import domain.TdpUser;
import dao.TdpUserDAO;
import io.dropwizard.hibernate.UnitOfWork;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
public class TdpInvestAuthResource {

    private final TdpUserDAO tdpUserDAO;
    private final TdpInvestAuthenticator authenticator;

    @Inject
    public TdpInvestAuthResource(TdpInvestAuthenticator authenticator, TdpUserDAO tdpUserDAO) {
        this.authenticator = authenticator;
        this.tdpUserDAO = tdpUserDAO;
    }

    @GET
    @Path("/valid")
    public String valid(@Auth TdpUser tdpUser) throws AuthenticationException {
        return "SUCCESS";
    }

    @POST
    @UnitOfWork
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(TdpUser tdpUser) throws AuthenticationException {
        BasicCredentials credentials = new BasicCredentials(tdpUser.getMail(), tdpUser.getPassword());

        if (authenticator.authenticate(credentials).isPresent()) {
            return Response.status(Response.Status.ACCEPTED).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @POST
    @UnitOfWork(flushMode = FlushMode.MANUAL)
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(TdpUser tdpUser) {
        try {
            tdpUserDAO.create(tdpUser);
            return Response.status(Response.Status.CREATED).build();
        } catch (HibernateException e) { // user already exists in a database
            return Response.status(Response.Status.CONFLICT).build();
        }
    }

}
