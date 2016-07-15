package resources;

import DAO.TdpIUnitDAO;
import com.google.inject.Inject;
import domain.TdpIUnit;
import domain.TdpIUser;
import io.dropwizard.auth.Auth;
import io.dropwizard.hibernate.UnitOfWork;
import services.TdpInvestLoadDataService;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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
  @Path("/loadlocal")
  @UnitOfWork
  public String test() {
    dataLoader.saveFromLocalFile();
    return "x";
  }

}