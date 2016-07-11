package resources;

import model.InvestScore;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Path("/investData")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestMainResource {

    @GET
    public List<InvestScore> fetch() {
        InvestScore investData1 = new InvestScore(LocalDate.now(), 300);
        InvestScore investData2 = new InvestScore(LocalDate.now().plus(1, ChronoUnit.MONTHS), 400);
        InvestScore investData3 = new InvestScore(LocalDate.now().plus(2, ChronoUnit.MONTHS), 500);
        InvestScore investData4 = new InvestScore(LocalDate.now().plus(3, ChronoUnit.MONTHS), 600);
        InvestScore investData5 = new InvestScore(LocalDate.now().plus(4, ChronoUnit.MONTHS), 700);
        return new ArrayList<InvestScore>(){{
            add(investData1);
            add(investData2);
            add(investData3);
            add(investData4);
            add(investData5);}};
    }
}
