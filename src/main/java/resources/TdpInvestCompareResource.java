package resources;

import dao.TdpIUnitDAO;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.inject.Inject;
import domain.TdpIUnit;
import io.dropwizard.hibernate.UnitOfWork;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by jakubr on 11/07/16.
 */
@Path("/compare")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestCompareResource {

    private TdpIUnitDAO tdpIUnitDAO;

    @Inject
    public TdpInvestCompareResource(TdpIUnitDAO tdpIUnitDAO) {
        this.tdpIUnitDAO = tdpIUnitDAO;
    }

    @POST
    @UnitOfWork
    @Consumes(MediaType.APPLICATION_JSON)
    public List<StockPrice> fetchRange(String json) throws ParseException {
        JsonObject jsonObject = new JsonParser().parse(json).getAsJsonObject();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dateFrom = sdf.parse(jsonObject.get("dateFrom").getAsString());
        Date dateTo = sdf.parse(jsonObject.get("dateTo").getAsString());

        System.out.println(jsonObject.get("dateFrom").getAsString());
        System.out.println(jsonObject.get("dateTo").getAsString());
        System.out.println(dateFrom.toString());
        System.out.println(dateTo.toString());

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<StockPrice> collection = new ArrayList<>();

        List<TdpIUnit> units = new ArrayList<>();
        units = tdpIUnitDAO.getDate(dateFrom, dateTo);

        for(TdpIUnit unit : units){
            collection.add(new StockPrice(dateFormat.format(unit.getDate()), unit.getValue()));
        }


        return collection;
    }



}
