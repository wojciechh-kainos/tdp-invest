package resources;


import dao.TdpIUnitDAO;
import com.google.inject.Inject;
import domain.TdpIUnit;
import io.dropwizard.hibernate.UnitOfWork;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;
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
	public List<TdpIUnit> fetch(@PathParam("id") Long id) {
		return tdpIUnitDAO.findAll();
	}

	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@UnitOfWork
	public Response uploadFile(
			@FormDataParam("file") InputStream fileInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {
//		dataLoader.loadFromUploadedFile(fileInputStream);

		return Response.status(200).entity("file uploaded").build();

	}
}
