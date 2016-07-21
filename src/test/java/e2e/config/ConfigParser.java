package e2e.config;

import com.fasterxml.jackson.dataformat.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ConfigParser {

    public static TestConfiguration parseTestConfigFile() {
        Yaml yaml = new Yaml();

        Path path = Paths.get(System.getProperty("user.dir"), "src/test/java/e2e/config/test_config.yml" );

        System.out.println(path);
        try( InputStream in = Files.newInputStream( path ) ) {
            TestConfiguration config = yaml.loadAs( in, TestConfiguration.class );
            System.out.println( config.getDefaultUrl() );
            return config;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
