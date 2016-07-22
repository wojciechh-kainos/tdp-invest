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

@Path("/convert")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestConvertResource {

    @Timed
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public String convert(@FormDataParam("file") final InputStream inputStream,
                          @FormDataParam("file") final FormDataContentDisposition contentDispositionHeader) throws IOException, JSONException {
        return CSVParser.CSVtoJSON(inputStream);
    }

}
