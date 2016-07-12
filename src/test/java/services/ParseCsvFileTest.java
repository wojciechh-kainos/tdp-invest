package services;

import model.InvestScore;
import org.junit.Test;
import org.junit.Before;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static junit.framework.TestCase.assertTrue;

public class ParseCsvFileTest {

    private CsvToModelParser csvToModelParser;
    private List<InvestScore> expectedInvestScores = new ArrayList<>();
    private String path = "/testAssets/investScoresTest.csv";

    @Before
    public void setUp() throws FileNotFoundException {
        csvToModelParser = new CsvToModelParser(path);
        expectedInvestScores.add(new InvestScore(LocalDate.of(1998,1,5),100));
        expectedInvestScores.add(new InvestScore(LocalDate.of(1990,2,6), (float)200.50));
    }

    @Test
    public void parseCsvFileWithTwoRecordsToInvestScoreModelTest() throws IOException {
        List<InvestScore> investScoreList = csvToModelParser.parse();
        assertTrue("List should contain expected investScores",
                expectedInvestScores.containsAll(investScoreList));
    }
}
