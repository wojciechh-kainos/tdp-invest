package auth;

import com.google.common.collect.ImmutableMap;
import io.dropwizard.auth.UnauthorizedHandler;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


public class TdpIUnauthorizedHandler implements UnauthorizedHandler {

	@Override
	public Response buildResponse(String prefix, String realm) {
		return Response.status(Response.Status.UNAUTHORIZED)
				.type(MediaType.APPLICATION_JSON_TYPE)
				.entity(ImmutableMap.of("error",
						"Credentials are required to access this resource."))
				.build();
	}
}
