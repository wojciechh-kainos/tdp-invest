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
import javax.ws.rs.core.Response;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
	@Path("/all")
	@UnitOfWork
	public List<TdpIUnit> getData() {
		return tdpIUnitDAO.getData();
	}

	@GET
	@Path("/start/{dateStart}/end/{dateEnd}")
	@Produces(MediaType.APPLICATION_JSON)
	@UnitOfWork
	//public List<TdpIUnit> select(
	public Response select(
			@PathParam("dateStart") String stringDateStart,
			@PathParam("dateEnd") String stringDateEnd
	) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date dateStart = sdf.parse(stringDateStart);
			Date dateEnd = sdf.parse(stringDateEnd);

			if (dateStart.getTime() >= dateEnd.getTime()) {
				return Response.status(Response.Status.BAD_REQUEST).entity("Start date cannot be higher than end date").build();
			}

			List<TdpIUnit> content = tdpIUnitDAO.selectData(dateStart, dateEnd);

			return Response.ok(content).build();
		} catch (ParseException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Invalid data format, allowed yyyy-MM-dd").build();
		}
	}

	@GET
	@Path("/{id}")
	@UnitOfWork
	public List<TdpIUnit> fetch(@PathParam("id") Long id) {
		return tdpIUnitDAO.getFundUnits(id);
	}


	@UnitOfWork
	public TdpIUnit fetchOne(@PathParam("id") Long id) {
		return tdpIUnitDAO.findById(id);
	}


}
