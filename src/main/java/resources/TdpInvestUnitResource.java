package resources;


import DAO.TdpIUnitDAO;
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

	/**
	 * The DAO object to manipulate units.
	 */
	private TdpIUnitDAO tdpIUnitDAO;

	public TdpInvestUnitResource(TdpIUnitDAO tdpIUnitDAO) {
		this.tdpIUnitDAO = tdpIUnitDAO;
	}

	@GET
	@UnitOfWork
	public List<TdpIUnit> fetchAll() {
		System.out.println("test");
		System.out.println(tdpIUnitDAO.findById(1L));
		return tdpIUnitDAO.findAll();
	}

	@GET
	@Path("/{id}")
	@UnitOfWork
	public TdpIUnit fetch(@PathParam("id") Long id) {
		return tdpIUnitDAO.findById(id);
	}
}