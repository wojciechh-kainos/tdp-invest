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

@Path("/unit")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestUnitResource {
    private class Unit {
        public String date;
        public Double value;

        public Unit(String a, Double b) {
            this.date = a;
            this.value = b;
        }

        
    }

    @GET
    public List<Unit> fetch() {
        List<Unit> data = new ArrayList<>();
        data.add(new Unit("2016-10-21", 200.0));
        data.add(new Unit("2016-10-22", 202.0));
        data.add(new Unit("2016-10-23", 204.0));
        data.add(new Unit("2016-10-24", 206.0));
        data.add(new Unit("2016-10-25", 208.0));
        data.add(new Unit("2016-10-26", 202.0));
        data.add(new Unit("2016-10-27", 200.0));
        data.add(new Unit("2016-10-29", 202.0));
        return data;
    }
}