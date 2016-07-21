package resources;

import DAO.TdpIUnitDAO;
import domain.TdpIUnit;
import domain.TdpUser;
import io.dropwizard.auth.Auth;
import io.dropwizard.hibernate.UnitOfWork;
import service.*;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/rows")
@Produces(MediaType.APPLICATION_JSON)
public class DataResource {

    private DateTransformer tra;
    private TdpIUnitDAO tdpDAO;
    @Inject
    DataResource( TdpIUnitDAO tdpDAO, DateTransformer tra) {
        this.tdpDAO = tdpDAO;
        this.tra = tra;
    }

    @GET
    @UnitOfWork
    @Path("/get")
    public List<TdpIUnit> fetchData(@QueryParam("startDate") String startDate,
                                    @QueryParam("endDate") String endDate) {
        List <TdpIUnit> list = tdpDAO.findDatesBetween(tra.getDateFromHtml(startDate) , tra.getDateFromHtml(endDate));
        return list;
    }
}
