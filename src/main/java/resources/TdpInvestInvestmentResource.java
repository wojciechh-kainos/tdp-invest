package resources;

import DAO.TdpIInvestmentDAO;
import com.google.inject.Inject;
import domain.TdpIInvestment;
import helpers.TimeSeries;
import io.dropwizard.hibernate.UnitOfWork;
import org.joda.time.DateTime;
import org.json.JSONException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Date;
import java.util.List;

@Path("/investment")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestInvestmentResource {

    private TdpIInvestmentDAO tdpIInvestmentDAO;

    @Inject
    public TdpInvestInvestmentResource(TdpIInvestmentDAO tdpIInvestmentDAO) { this.tdpIInvestmentDAO = tdpIInvestmentDAO; }

    @GET
    @Path("/list")
    @UnitOfWork
    public List<TdpIInvestment> fetchAll() {
        return this.tdpIInvestmentDAO.findAll();
    }

    @GET
    @Path("/{investmentId}")
    @UnitOfWork
    public TdpIInvestment fetch(@PathParam("investmentId") Long id) {
        return tdpIInvestmentDAO.findById(id);
    }


    @GET
    @Path("/list/between")
    @UnitOfWork
    public List<TdpIInvestment> fetchBetween(@QueryParam("startDate")String startDate,
                                             @QueryParam("endDate")String endDate){
        return tdpIInvestmentDAO.findBetween(convertToDate(startDate), convertToDate(endDate));
    }

    @POST
    @Path("/create")
    @UnitOfWork
    @Consumes(MediaType.APPLICATION_JSON)
    public long create(TdpIInvestment investment){
        return tdpIInvestmentDAO.create(investment);
    }

    @PUT
    @Path("/edit")
    @UnitOfWork
    @Consumes(MediaType.APPLICATION_JSON)
    public void edit(TdpIInvestment investment) {
        tdpIInvestmentDAO.edit(investment);
    }

    @DELETE
    @Path("/delete/{investmentId}")
    @UnitOfWork
    public void delete(@PathParam("investmentId")Long id){
        tdpIInvestmentDAO.removeById(id);
    }

    @GET
    @Path("/timeseries")
    public String fetchInvestmentTimeSeries(@QueryParam("startDate")long startDate,
                                            @QueryParam("endDate")long endDate,
                                            @QueryParam("amount")double amount,
                                            @QueryParam("annualRate")double annualRate) throws JSONException {

        return TimeSeries.createTimeSeries(new DateTime(startDate), new DateTime(endDate), amount, annualRate);
    }

    private Date convertToDate(String s){ return s == null ? null : DateTime.parse(s).toDate(); }
}
