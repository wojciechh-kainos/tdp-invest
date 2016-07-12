package services;

import model.InvestScore;
import org.junit.Assert;
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
    private String path = "/testAssets/investScoresInvalidDateTest.csv";
    private InvestScore expectedInvestScore;

    @Before
    public void setUp() throws FileNotFoundException {
        expectedInvestScore = new InvestScore(LocalDate.of(1998,1,5),100);
        csvToModelParser = new CsvToModelParser(path);
    }

    @Test
    public void parseCsvFileWithInvalidDateToInvestScoreModelTest() throws IOException {
        List<InvestScore> investScoreList = csvToModelParser.parse();
        assertEquals("List should ignore invalid line",
                investScoreList.size(), 1);
        assertTrue("List should contain correct investScore", investScoreList.contains(expectedInvestScore));
    }
}
