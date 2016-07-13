package resources;


import DAO.TdpIUnitDAO;
import com.google.inject.Inject;
import domain.TdpIUnit;
import io.dropwizard.hibernate.UnitOfWork;

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

	@Inject
	public TdpInvestUnitResource(TdpIUnitDAO tdpIUnitDAO) {
		this.tdpIUnitDAO = tdpIUnitDAO;
	}

	@GET
	@UnitOfWork
	public List<TdpIUnit> fetchAll() {
		return tdpIUnitDAO.getData();
	}

	@GET
	@Path("/{id}")
	@UnitOfWork
	public TdpIUnit fetch(@PathParam("id") Long id) {
		return tdpIUnitDAO.findById(id);
	}
}