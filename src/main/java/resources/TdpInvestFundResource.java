package resources;


import com.google.inject.Inject;
import dao.TdpFundDAO;
import dao.TdpUnitDAO;
import domain.TdpFund;
import domain.TdpUnit;
import domain.TdpUser;
import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.hibernate.UnitOfWork;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Date;
import java.util.List;


@Path("/fund")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestFundResource {

    private TdpFundDAO tdpFundDAO;
    private TdpUnitDAO tdpUnitDAO;

    @Inject
    public TdpInvestFundResource(TdpFundDAO tdpFundDAO, TdpUnitDAO tdpUnitDAO) {
        this.tdpFundDAO = tdpFundDAO;
        this.tdpUnitDAO = tdpUnitDAO;
    }

    @GET
    @UnitOfWork
    public List<TdpFund> fetchAll(@Auth TdpUser tdpUser) throws AuthenticationException {
        return tdpFundDAO.findAll();
    }

    @GET
    @Path("/{id}")
    @UnitOfWork
    public TdpFund fetch(@PathParam("id") Long id) {
        return tdpFundDAO.findById(id);
    }


}
