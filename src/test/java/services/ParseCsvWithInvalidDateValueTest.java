package services;

import domain.TdpIUnit;
import org.junit.Before;
import org.junit.Test;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

/**
 * Created by malgorzatas on 12/07/16.
 */
public class ParseCsvWithInvalidDateValueTest {

    private CsvToModelParser csvToModelParser;
    private TdpIUnit expectedInvestScore;

    @Before
    public void setUp() throws FileNotFoundException {
        String path = getClass().getResource("/testAssets/investScoresInvalidDateTest.csv").getPath();
        expectedInvestScore = new TdpIUnit();
        expectedInvestScore.setDate(LocalDate.of(1998,1,5));
        expectedInvestScore.setValue(100.00);
        csvToModelParser = new CsvToModelParser(path);
    }

    @Test
    public void parseCsvFileWithInvalidDateToTdpIUnitTest() throws IOException {
        List<TdpIUnit> tdpIUnitList = csvToModelParser.parse();
        assertEquals("List should ignore invalid line",
                tdpIUnitList.size(), 1);
        assertTrue("List should contain correct TdpIUnit", tdpIUnitList.contains(expectedInvestScore));
    }
}
