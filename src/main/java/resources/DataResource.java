package resources;

import api.CalculatedRow;
import api.Row;
import service.*;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Path("/rows")
@Produces(MediaType.APPLICATION_JSON)
public class DataResource {

    private RowRepository repo;

    @Inject
    DataResource(RowRepository repo) {
        this.repo = repo;
    }

    @GET
    @Path("/get/data")
    public List<Row> fetchData(@PathParam("startDate") String startDate,
                               @PathParam("endDate") String endDate) {

        return repo.getAllRows();
    }

    @GET
    @Path("/get/compare")
    public List<CalculatedRow> fetchCompare(@PathParam("startDate") String startDate,
                                            @PathParam("endDate") String endDate,
                                            @PathParam("input") int input,
                                            @PathParam("percentage") int percentage) {
        CalculatedRow row1 = new CalculatedRow(new Date(), new BigDecimal(377), new BigDecimal(123));

        List<CalculatedRow> calcs = new ArrayList<>();
        calcs.add(row1);
        calcs.add(row1);
        calcs.add(row1);

        return calcs;
    }

}
