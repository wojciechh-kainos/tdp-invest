package resources;

import com.codahale.metrics.annotation.Timed;
import helpers.CSVParser;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.JSONException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.InputStream;


/**
 * Created by dawidk on 08/07/16.
 */

@Path("/convert")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestConvertResource {


    //    @POST
    //    public String convert() throws JSONException {
    //
    //        //return CSVParser.CSVtoJSON(file);
    //        return "";
    //    }
    @Timed
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public String convert(@FormDataParam("file") final InputStream inputStream,
                          @FormDataParam("file") final FormDataContentDisposition contentDispositionHeader) throws IOException, JSONException {
        System.out.println("convert method running");
        return CSVParser.CSVtoJSON(inputStream);
    }

}
