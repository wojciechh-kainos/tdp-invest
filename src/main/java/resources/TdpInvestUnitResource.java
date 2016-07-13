package resources;


import DAO.TdpIUnitDAO;
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
	private static Boolean isDateInitialized = false;

	@Inject
	public TdpInvestUnitResource(TdpIUnitDAO tdpIUnitDAO) {
		this.tdpIUnitDAO = tdpIUnitDAO;
	}

	@GET
	@UnitOfWork
	public List<TdpIUnit> fetchAll() {
		if(!isDateInitialized)
			try {
				initializeDateFromFile();
				isDateInitialized = true;
			} catch (IOException e) {
				e.printStackTrace();
				isDateInitialized = false;
			}

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

	private void initializeDateFromFile() throws IOException {
		CsvToModelParser csvToModelParser = new CsvToModelParser(TdpConfig.pathToData);
		List<TdpIUnit> list = csvToModelParser.parse();
		list.forEach(record -> tdpIUnitDAO.create(record));
	}

}