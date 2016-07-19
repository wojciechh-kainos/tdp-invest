package resources;

import com.google.inject.Inject;
import services.DummyJob;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

@Path("/person/{personId}")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestPersonResource {

    private DummyJob myJob;

    @Inject
    public TdpInvestPersonResource(DummyJob job) {
        myJob = job;
    }

    public DummyJob getJob() {
        return myJob;
    }

    @GET
    public String fetch(@PathParam("personId") String personId) {
        return personId;
    }
}
