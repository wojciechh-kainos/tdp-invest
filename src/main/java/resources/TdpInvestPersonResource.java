package resources;

import model.Person;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/person")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestPersonResource {

    @GET
    @Path("/{personId}")
    public String fetch(@PathParam("personId") String personId) {
        return personId+55;
    }

    @POST
    public Person create(Person person){
        return person;
    }
}
