package api;

import com.google.inject.Guice;
import com.google.inject.Injector;
import framework.BaseTest;
import io.dropwizard.jackson.Jackson;
import org.junit.Before;
import org.junit.BeforeClass;

import org.junit.Test;
import service.DateTransformer;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import static io.dropwizard.testing.FixtureHelpers.*;
import static org.assertj.core.api.Assertions.assertThat;
import io.dropwizard.jackson.Jackson;
import org.junit.Test;
import com.fasterxml.jackson.databind.ObjectMapper;

import static junit.framework.TestCase.assertTrue;

public class RowTest {

    private Row row;

    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();

    @Before
    public void initialize() {
        DateTransformer trans = new DateTransformer();
        Date myDate = trans.getDateFromHtml("2013-02-12");
        BigDecimal val = new BigDecimal(12);
        this.row = new Row(myDate, val);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        MAPPER.setDateFormat(sdf);
    }

    @Test
    public void simpleTest() {
        assertTrue(row instanceof Row);
    }

    @Test
    public void serializeToJson() throws Exception {
        final String expected = MAPPER.writeValueAsString(
                MAPPER.readValue(fixture("fixtures/row.json"), Row.class));
        assertThat(MAPPER.writeValueAsString(row)).isEqualTo(expected);
    }

}
