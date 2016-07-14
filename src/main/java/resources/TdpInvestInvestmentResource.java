package resources;

import helpers.TimeSeries;
import model.Fund;
import model.Investment;
import org.joda.time.DateTime;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("/investment")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestInvestmentResource {
    @GET
    @Path("/{investmentId}")
    public String fetch(@PathParam("investmentId") String investmentId) { return investmentId + "aaa"; }

    @GET
    @Path("/timeseries")
    public List<Fund> fetchInvestmentTimeSeries(@QueryParam("startDate")long startDate,
                                                @QueryParam("endDate")long endDate,
                                                @QueryParam("amount")double amount,
                                                @QueryParam("annualRate")double annualRate){


        TimeSeries ts = new TimeSeries(new DateTime(startDate), new DateTime(endDate), amount, annualRate);

        return ts.getTimeSeries();
    }

    @GET
    @Path("/list")
    public List<Investment> fetchInvestments(){
        List<Investment> list = new ArrayList<>();
        list.add(new Investment(1000.00, 0.01));
        list.add(new Investment(1000.00, 0.02));
        list.add(new Investment(1000.00, 0.03));
        list.add(new Investment(1000.00, 0.04));
        list.add(new Investment(1000.00, 0.0456));
        list.add(new Investment(1000.00, 0.05));

        return list;
    }
}
