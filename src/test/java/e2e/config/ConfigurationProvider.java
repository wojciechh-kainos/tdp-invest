package e2e.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Resources;
import com.google.inject.Singleton;
import io.dropwizard.configuration.ConfigurationFactory;
import io.dropwizard.jackson.Jackson;
import io.dropwizard.validation.BaseValidator;

import java.io.File;
import java.net.URI;

@Singleton
public class ConfigurationProvider {

	private static final ObjectMapper objectMapper = Jackson.newObjectMapper();
	private static final ConfigurationFactory<TestConfiguration> factory = new ConfigurationFactory<>(
			TestConfiguration.class,
			BaseValidator.newValidator(),
			objectMapper, "dw");

	private static TestConfiguration config;

	private static TestConfiguration parseFile() throws Exception {
		URI path = Resources.getResource("test_config.yml").toURI();
		return factory.build(new File(path));
	}

	public static TestConfiguration getConfig() throws Exception {
		if (config == null) {
			config = parseFile();
		}
		return config;
	}
}