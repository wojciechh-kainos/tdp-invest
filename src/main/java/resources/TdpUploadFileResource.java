package resources;

import com.google.inject.Inject;
import configuration.TdpConfig;
import dao.TdpIUnitDAO;
import domain.TdpIUnit;
import io.dropwizard.hibernate.UnitOfWork;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import services.CsvToModelParser;
import services.FileDownloader;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.util.List;

/**
 * Created by malgorzatas on 15/07/16.
 */

@Path("/files")
@Produces(MediaType.APPLICATION_JSON)
public class TdpUploadFileResource {

        private TdpIUnitDAO tdpIUnitDAO;

        @Inject
        public TdpUploadFileResource(TdpIUnitDAO tdpIUnitDAO) {
            this.tdpIUnitDAO = tdpIUnitDAO;
        }

        @POST
        @Path("/upload")
        @Consumes(MediaType.MULTIPART_FORM_DATA)
        @UnitOfWork
        public Response uploadFile(
                @FormDataParam("file") InputStream uploadedInputStream,
                @FormDataParam("file") FormDataContentDisposition fileDetail) {

            try {
                String path = new FileDownloader().saveFile(uploadedInputStream, fileDetail.getFileName());
                insertDataToDb(path);
            } catch (IOException e) {
                e.printStackTrace();
                return Response.status(400).build();
            }

            return Response.status(200).build();
        }

        private void insertDataToDb(String path) throws IOException {
            CsvToModelParser csvToModelParser = new CsvToModelParser(path);
            List<TdpIUnit> list = csvToModelParser.parse();
            tdpIUnitDAO.deleteAll();
            list.forEach(record -> tdpIUnitDAO.create(record));
        }


}
