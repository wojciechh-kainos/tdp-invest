package resources;

import com.google.inject.Inject;
import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;
import domain.TdpUser;
import dao.TdpUserDAO;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.params.IntParam;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
public class TdpInvestAuthResource {

    private final TdpUserDAO tdpUserDAO;

    @Inject
    public TdpInvestAuthResource(TdpUserDAO tdpUserDAO) {
        this.tdpUserDAO = tdpUserDAO;
    }

    @GET
    @Path("/login")
    public String login(@Auth TdpUser tdpUser) throws AuthenticationException {
        return tdpUser.getToken();
    }

    @POST
    @UnitOfWork(flushMode = FlushMode.MANUAL)
    @Path("/register")
    public Response register(TdpUser tdpUser) {
        try {
            tdpUserDAO.create(tdpUser);
            return Response.status(Response.Status.CREATED).build();
        } catch (HibernateException e) { // user already exists in a database
            return Response.status(Response.Status.CONFLICT).build();
        }
    }

    @DELETE
    @UnitOfWork(flushMode = FlushMode.MANUAL)
    @Path("/{email}")
    public void delete(@PathParam("email") String email) {
            tdpUserDAO.delete(email);
    }

}
