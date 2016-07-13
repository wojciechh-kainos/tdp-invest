package resources;

import helpers.TimeSeries;
import model.Fund;
import org.joda.time.DateTime;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
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
}
