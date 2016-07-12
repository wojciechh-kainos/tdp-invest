package resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by jakubr on 11/07/16.
 */
@Path("/compare")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestCompareResource {

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

}
