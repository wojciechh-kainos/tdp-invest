package e2e.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Resources;
import com.google.inject.Singleton;
import io.dropwizard.configuration.ConfigurationException;
import io.dropwizard.configuration.ConfigurationFactory;
import io.dropwizard.jackson.Jackson;
import io.dropwizard.testing.ResourceHelpers;
import io.dropwizard.validation.BaseValidator;

import javax.print.URIException;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@Singleton
public class ConfigurationProvider {

    private static final ObjectMapper objectMapper = Jackson.newObjectMapper();
    private static final ConfigurationFactory<TestConfiguration> factory = new ConfigurationFactory<>(
            TestConfiguration.class,
            BaseValidator.newValidator(),
            objectMapper, "dw");

    private static TestConfiguration config;

    private static TestConfiguration parseFile() {
        try {
            URI path = Resources.getResource("test_config.yml").toURI();
            return factory.build(new File(path));
        } catch (IOException | URISyntaxException | ConfigurationException e) {
            return null;
        }
    }

    public static TestConfiguration getConfig() {
        if (config == null) {
            config = parseFile();
        }
        return config;
    }
}
