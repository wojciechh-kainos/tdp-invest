package resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/person/{personId}")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestPersonResource {

    @GET
    public String fetch(@PathParam("personId") String personId) {
        return personId+55;
    }


}