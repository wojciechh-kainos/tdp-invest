package resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.Map;

@Path("/unit")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestUnitResource {

    @GET
    public Map<String, Double> fetch() {
        Map<String, Double> data = new HashMap<>();
        data.put("05/01/1998", 200.0);
        data.put("06/01/1998", 202.0);
        data.put("07/01/1998", 204.0);
        data.put("08/01/1998", 206.0);
        data.put("09/01/1998", 208.0);
        data.put("15/01/1998", 202.0);
        data.put("25/01/1998", 200.0);
        data.put("27/01/1998", 202.0);
        return data;
    }
}
