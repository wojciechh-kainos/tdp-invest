package resources;

import DAO.TdpIUnitDAO;
import api.CalculatedRow;
import api.Row;
import domain.TdpIUnit;
import io.dropwizard.hibernate.UnitOfWork;
import org.hibernate.SessionFactory;
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
    private DateTransformer tra = new DateTransformer();
    private TdpIUnitDAO tdpDAO;

    @Inject
    DataResource(RowRepository repo, TdpIUnitDAO tdpDAO) {
        this.repo = repo;
        this.tdpDAO = tdpDAO;
    }




    @GET
    @Path("/get/data")
    public List<Row> fetchData(@PathParam("startDate") String startDate,
                               @PathParam("endDate") String endDate) {
        return repo.getAllRows();
    }

    @GET
    @UnitOfWork
    @Path("/get/compare")
    public List<TdpIUnit> fetchCompare(@PathParam("startDate") String startDate,
                                            @PathParam("endDate") String endDate,
                                            @PathParam("input") int input,
                                            @PathParam("percentage") int percentage) {
        CalculatedRow row1 = new CalculatedRow(tra.getDate("12/02/2013"), new BigDecimal(377), new BigDecimal(123));
        CalculatedRow row2 = new CalculatedRow(tra.getDate("13/02/2013"), new BigDecimal(377), new BigDecimal(123));
        CalculatedRow row3 = new CalculatedRow(tra.getDate("14/02/2013"), new BigDecimal(377), new BigDecimal(123));
        List<CalculatedRow> calcs = new ArrayList<>();
        calcs.add(row1);
        calcs.add(row2);
        calcs.add(row3);


        List <TdpIUnit> list = tdpDAO.findAll();


        return list;
    }

}
