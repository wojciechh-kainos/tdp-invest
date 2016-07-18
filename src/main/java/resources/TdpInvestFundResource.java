package resources;


import com.google.inject.Inject;
import dao.TdpFundDAO;
import dao.TdpUnitDAO;
import domain.TdpFund;
import domain.TdpUnit;
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
    public List<TdpFund> fetchAll() {
        return tdpFundDAO.findAll();
    }

    @GET
    @Path("/insert")
    @UnitOfWork
    public TdpFund insert() {
        TdpFund fund = new TdpFund();
        fund.setName("Test");
        fund.setShortcut("TST");

        TdpUnit unit = new TdpUnit();
        unit.setFund(fund);
        unit.setDate(new Date(981068400000L));
        unit.setValue(12.32);

        tdpFundDAO.create(fund);
        tdpUnitDAO.create(unit);

        return fund;
    }

    @GET
    @Path("/{id}")
    @UnitOfWork
    public TdpFund fetch(@PathParam("id") Long id) {
        return tdpFundDAO.findById(id);
    }


}
