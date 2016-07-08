package resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Path("/rows")
@Produces(MediaType.APPLICATION_JSON)
public class DataResource {

    @GET
    @Path("/get/data")
    public List<Row> fetchData() {
        Database myDb = new LameMemoryDatabase();
        DatabaseInitializer init = new LameDatabaseInitializer();
        init.initializeDatabase(myDb);

        List<Row> result = myDb.getAllRows();

        return result;
    }

    @GET
    @Path("/get/compare")
    public List<CalculatedRow> fetchCompare() {
        CalculatedRow row1 = new CalculatedRow(new Date(), new BigDecimal(377), new BigDecimal(123));

        List<CalculatedRow> calcs = new ArrayList<>();
        calcs.add(row1);
        calcs.add(row1);
        calcs.add(row1);

        return calcs;
    }

}
