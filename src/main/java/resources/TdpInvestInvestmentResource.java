package resources;

import DAO.TdpIInvestmentDAO;
import com.google.inject.Inject;
import domain.TdpIInvestment;
import helpers.TimeSeries;
import io.dropwizard.hibernate.UnitOfWork;
import model.Fund;
import model.Investment;
import org.joda.time.DateTime;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
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
    public List<TdpIInvestment> fetchAll() { return this.tdpIInvestmentDAO.findAll(); }

    @GET
    @Path("/{investmentId}")
    @UnitOfWork
    public TdpIInvestment fetch(@PathParam("investmentId") Long id) { return tdpIInvestmentDAO.findById(id); }


    @GET
    @Path("/list/between")
    @UnitOfWork
    public List<TdpIInvestment> fetchBetween(@QueryParam("startDate")String startDate,
                                             @QueryParam("endDate")String endDate){
        return tdpIInvestmentDAO.findBetween(convertToDate(startDate), convertToDate(endDate));
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

    private static Date convertToDate(String s){
        if (s == null) {
            return null;
        } else{
            return DateTime.parse(s).toDate();
        }
    }
}
