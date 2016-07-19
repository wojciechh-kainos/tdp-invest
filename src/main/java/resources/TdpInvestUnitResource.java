package resources;


import dao.TdpIUnitDAO;
import com.google.inject.Inject;
import configuration.TdpConfig;
import domain.TdpIUnit;
import io.dropwizard.hibernate.UnitOfWork;
import services.CsvToModelParser;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
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
		return tdpIUnitDAO.findAll();
	}

	@GET
	@Path("/{id}")
	@UnitOfWork
	public TdpIUnit fetch(@PathParam("id") Long id) {
		return tdpIUnitDAO.findById(id);
	}

	@POST
	@UnitOfWork
	public Long createTdpUnit(TdpIUnit tdpUnit) {
		return tdpIUnitDAO.create(tdpUnit);
	}

}