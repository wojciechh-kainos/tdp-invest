package resources;

import configuration.TdpConfig;
import model.InvestScore;
import services.CsvToModelParser;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("/investData")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestMainResource {

    @GET
    public List<InvestScore> fetch(){
        try{
            CsvToModelParser csvToModelParser = new CsvToModelParser(TdpConfig.pathToData);
            return csvToModelParser.parse();
        }
        catch (Exception ex){
            return new ArrayList<InvestScore>();
        }
    }
}
