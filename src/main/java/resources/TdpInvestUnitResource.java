package resources;

import DAO.TdpIUnitDAO;
import com.google.inject.Inject;
import domain.TdpIDateRange;
import domain.TdpIUnit;
import io.dropwizard.hibernate.UnitOfWork;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import services.TdpInvestLoadDataService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;
import java.util.List;



@Path("/unit")
@Produces(MediaType.APPLICATION_JSON)
public class TdpInvestUnitResource {
  private TdpIUnitDAO tdpIUnitDAO;
  private TdpInvestLoadDataService dataLoader;

  @Inject
  public TdpInvestUnitResource(TdpIUnitDAO tdpIUnitDAO, TdpInvestLoadDataService dataLoader) {
      this.tdpIUnitDAO = tdpIUnitDAO;
      this.dataLoader = dataLoader;
  }

  @GET
  @UnitOfWork
  public List<TdpIUnit> fetchAll() {
      return tdpIUnitDAO.findAll();
  }

  @GET
  @Path("/{id}")
  @UnitOfWork
  public TdpIUnit fetch(@PathParam("id") Long id) {
      return tdpIUnitDAO.findById(id);
  }

  @GET
  @Path("/loadData")
  @UnitOfWork
  public String test() {
    dataLoader.loadFromLocalFile();
    return "x";
  }

  @POST
  @Path("/loadData")
  @Consumes(MediaType.MULTIPART_FORM_DATA)
  @UnitOfWork
  public Response uploadFile(
          @FormDataParam("file") InputStream fileInputStream,
          @FormDataParam("file") FormDataContentDisposition fileDetail) {
    dataLoader.loadFromUploadedFile(fileInputStream);

    return Response.status(200).entity("file uploaded").build();

  }

  @GET
  @Path("/range")
  @Consumes(MediaType.APPLICATION_JSON)
  @UnitOfWork
  public List<TdpIUnit> fetchAllWithinRange() {
    return tdpIUnitDAO.findAllWithinRange();
  }

}