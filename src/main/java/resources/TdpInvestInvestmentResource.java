package resources;

import helpers.TimeSeries;
import model.Fund;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Date;
import java.util.List;

@Path("/investment")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestInvestmentResource {
    @GET
    @Path("/{investmentId}")
    public String fetch(@PathParam("investmentId") String investmentId) { return investmentId + "aaa"; }

    @GET
    @Path("/timeseries")
    public List<Fund> fetchInvestmentTimeSeries(@QueryParam("startDate")Date startDate,
                                                @QueryParam("endDate")Date endDate,
                                                @QueryParam("amount")double amount,
                                                @QueryParam("annualRate")double annualRate){
        TimeSeries ts = new TimeSeries(startDate, endDate, amount, annualRate);

        return ts.getTimeSeries();
    }
}
