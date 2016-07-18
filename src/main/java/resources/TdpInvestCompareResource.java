package resources;

import com.google.gson.JsonArray;
import dao.TdpIUnitDAO;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.inject.Inject;
import domain.TdpIUnit;
import io.dropwizard.auth.Auth;
import io.dropwizard.hibernate.UnitOfWork;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
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
    public List<StockPrice> fetchRange(String json) throws ParseException, IOException {


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

    @POST
    @UnitOfWork
    @Path("/date")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<StockPrice> fetchRangeDate(String json) throws ParseException, IOException, JSONException {

        JSONObject object = new JSONObject(json);
        JSONObject date = new JSONObject();
        Date dateFrom = new Date();
        Date dateTo = new Date();
        List<TdpIUnit> units = new ArrayList<>();
        List<StockPrice> collection = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        JSONArray requests = object.getJSONArray("requests");
        for(int i = 0; i < requests.length(); i++){
            date = requests.getJSONObject(i);
            dateFrom = sdf.parse(date.getString("p"));
            dateTo = sdf.parse(date.getString("k"));
            units = tdpIUnitDAO.getDate(dateFrom, dateTo);
            for(TdpIUnit unit : units){
                collection.add(new StockPrice(dateFormat.format(unit.getDate()), unit.getValue()));
            }
        }
        System.out.println("DO ZWRÓCENIA: " + collection);
        return collection;
    }



}
