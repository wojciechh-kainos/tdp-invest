package resources;

import DAO.TdpIUnitDAO;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import domain.TdpIUnit;
import sun.java2d.pipe.SpanShapeRenderer;

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

    //funkcja wysyłająca dane do angulara :)
    @GET
    public List<StockPrice> fetch() {
        List<StockPrice> collection = new ArrayList<>();
        collection = generate(20, 4.0f, 0.02f);
        return collection;
    }

    //generate - funkcja generująca dane date + price
    public List<StockPrice> generate(int n, float maxX, float minX){

        List<StockPrice> collection = new ArrayList<>();
        Random rand = new Random();
        Float price;
        String date;
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        for(int i=0; i<n; i++){
            price = rand.nextFloat() * (maxX - minX) + minX;
            Date d = new Date();
            date = dateFormat.format(d);
            collection.add(new StockPrice(date, price));
        }

        return collection;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public List<TdpIUnit> fetchRange(String json) throws ParseException {
        JsonObject jsonObject = new JsonParser().parse(json).getAsJsonObject();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dateFrom = sdf.parse(jsonObject.get("dateFrom").getAsString());
        Date dateTo = sdf.parse(jsonObject.get("dateTo").getAsString());

        System.out.println(jsonObject.get("dateFrom").getAsString());
        System.out.println(jsonObject.get("dateTo").getAsString());
        System.out.println(dateFrom.toString());
        System.out.println(dateTo.toString());

        List<TdpIUnit> collection = new ArrayList<>();
        collection = new TdpInvestUnitResource(tdpIUnitDAO).fetchAll();

        return collection;
    }



}
