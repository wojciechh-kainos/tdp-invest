package resources;


import dao.TdpIFundDAO;
import dao.TdpIUnitDAO;
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
    private TdpIUnitDAO tdpIUnitDAO;

    @Inject
    public TdpInvestFundResource(TdpIFundDAO tdpIFundDAO, TdpIUnitDAO tdpIUnitDAO) {

        this.tdpIFundDAO = tdpIFundDAO;
        this.tdpIUnitDAO = tdpIUnitDAO;
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

        TdpIUnit unit = new TdpIUnit();
        unit.setFund(fund);
        unit.setDate(new Date(981068400000L));
        unit.setValue(12.32);

        tdpIFundDAO.create(fund);
        tdpIUnitDAO.create(unit);

        return fund;
    }

    @GET
    @Path("/{id}")
    @UnitOfWork
    public TdpIFund fetch(@PathParam("id") Long id) {
        return tdpIFundDAO.findById(id);
    }


}
