package resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/rows")
@Produces(MediaType.APPLICATION_JSON)
public class RowResource {

    @GET
    @Path("/get")
    public List<Row> fetch() {
        Database myDb = new LameMemoryDatabase();
        DatabaseInitializer init = new LameDatabaseInitializer();
        init.initializeDatabase(myDb);

        List<Row> result = myDb.getAllRows();

        return result;
    }
}
