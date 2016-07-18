package resources;

import DAO.TdpIInvestmentDAO;
import com.codahale.metrics.annotation.Timed;
import com.google.inject.Inject;
import domain.TdpIInvestment;
import helpers.TimeSeries;
import io.dropwizard.hibernate.UnitOfWork;
import model.Fund;
import org.apache.commons.lang3.NotImplementedException;
import org.joda.time.DateTime;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
    public long edit(TdpIInvestment investment) {
        throw new NotImplementedException("You have to implement that method first!");
    }

    @DELETE
    @Path("/delete")
    @UnitOfWork
    @Consumes(MediaType.APPLICATION_JSON)
    public void delete(TdpIInvestment investment){
        tdpIInvestmentDAO.remove(investment);
    }

    @GET
    @Path("/timeseries")
    public List<Fund> fetchInvestmentTimeSeries(@QueryParam("startDate")long startDate,
                                                @QueryParam("endDate")long endDate,
                                                @QueryParam("amount")double amount,
                                                @QueryParam("annualRate")double annualRate){

        TimeSeries ts = new TimeSeries(new DateTime(startDate), new DateTime(endDate), amount, annualRate);

        return ts.getTimeSeries();
    }

    private DateTime convertToDate(String s){ return s == null ? null : DateTime.parse(s); }
}
