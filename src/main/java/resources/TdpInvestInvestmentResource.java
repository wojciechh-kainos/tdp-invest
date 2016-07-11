package resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/investment")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestInvestmentResource {
    @GET
    @Path("/{investmentId}")
    public String fetch(@PathParam("investmentId") String investmentId) { return investmentId + "aaa"; }
}
