package resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/price")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestPriceResource {

    @GET
    public Map<String, Double> fetch() {
        Map<String, Double> data = new HashMap<>();
        data.put("2016-10-21", 200.0);
        data.put("2016-10-22", 202.0);
        data.put("2016-10-23", 204.0);
        data.put("2016-10-24", 206.0);
        data.put("2016-10-25", 208.0);
        data.put("2016-10-26", 202.0);
        data.put("2016-10-27", 200.0);
        data.put("2016-10-29", 202.0);
        return data;
    }
}
