package resources;


import DAO.TdpIFundDAO;
import com.google.inject.Inject;
import domain.TdpIFund;
import domain.TdpIUnit;
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

    private TdpIFundDAO tdpIFundDAO;

    @Inject
    public TdpInvestFundResource(TdpIFundDAO tdpIFundDAO) {
        this.tdpIFundDAO = tdpIFundDAO;
    }

    @GET
    @UnitOfWork
    public List<TdpIFund> fetchAll() {
        return tdpIFundDAO.findAll();
    }

    @GET
    @Path("/insert")
    @UnitOfWork
    public TdpIFund insert() {
        TdpIFund fund = new TdpIFund();
        fund.setName("Test");
        fund.setShortcut("TST");

        tdpIFundDAO.create(fund);

        return fund;
    }

    @GET
    @Path("/{id}")
    @UnitOfWork
    public TdpIFund fetch(@PathParam("id") Long id) {
        return tdpIFundDAO.findById(id);
    }
}
