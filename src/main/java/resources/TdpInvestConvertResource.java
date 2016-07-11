package resources;

import helpers.CSVParser;
import model.Person;
import org.json.JSONException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.File;

/**
 * Created by dawidk on 08/07/16.
 */

@Path("/convert")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestConvertResource {


    @POST
    public String convert(String file) throws JSONException {
        return CSVParser.CSVtoJSON(file);
    }

}
