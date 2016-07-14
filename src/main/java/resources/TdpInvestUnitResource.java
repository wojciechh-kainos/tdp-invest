package resources;


import DAO.TdpIUnitDAO;
import com.google.inject.Inject;
import domain.TdpIUnit;
import io.dropwizard.hibernate.UnitOfWork;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
	@Path("/select/{fund}")
	@Produces(MediaType.APPLICATION_JSON)
	@UnitOfWork
	public Response select(
			@PathParam("fund") Long id,
			@QueryParam("dateStart") String stringDateStart,
			@QueryParam("dateEnd") String stringDateEnd
	) {
		List<String> errors = new ArrayList<String>();

		if (id == null)
			errors.add("No fund ID!");
		else {
			if(stringDateStart == null && stringDateEnd == null) {
				List<TdpIUnit> content = tdpIUnitDAO.getFundUnits(id);
				return Response.ok(content).build();
			}
		}

		if(stringDateStart == null)
			errors.add("No start data string!");

		if(stringDateEnd == null)
			errors.add("No end data string!");

		if(errors.size() > 0)
			return Response.status(Response.Status.BAD_REQUEST).entity(errors).build();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date dateStart = sdf.parse(stringDateStart);
			Date dateEnd = sdf.parse(stringDateEnd);

			if (dateStart.getTime() >= dateEnd.getTime()) {
				return Response.status(Response.Status.BAD_REQUEST).entity("Start date cannot be higher than end date").build();
			}

			List<TdpIUnit> content = tdpIUnitDAO.selectData(id, dateStart, dateEnd);

			return Response.ok(content).build();
		} catch (ParseException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Invalid data format, allowed yyyy-MM-dd").build();
		}
	}

	@UnitOfWork
	public TdpIUnit fetchOne(@PathParam("id") Long id) {
		return tdpIUnitDAO.findById(id);
	}


}
