package e2e.config;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.core.MediaType;

/**
 * Created by malgorzatas on 22/07/16.
 */
public class DatabaseHelper {

	private final TestConfiguration config;
	private final Client client;

	public DatabaseHelper() throws Exception {
		this.client = ClientBuilder.newClient();
		this.config = ConfigurationProvider.getConfig();
	}

	public void deleteUser(String username){
		Invocation.Builder request  = client.target(config.getApiUrl() + "/auth/delete/" + username).request();
		request.accept(MediaType.APPLICATION_JSON);
		request.delete();
	}
}