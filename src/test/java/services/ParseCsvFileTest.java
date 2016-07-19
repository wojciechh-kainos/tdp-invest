package services;

import domain.TdpIUnit;
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
    private List<TdpIUnit> expectedInvestScores = new ArrayList<>();

    @Before
    public void setUp() throws FileNotFoundException {
        String path = getClass().getResource("/testAssets/investScoresTest.csv").getPath();
        csvToModelParser = new CsvToModelParser(path);
        expectedInvestScores.add(new TdpIUnit(LocalDate.of(1998,1,5), (double)100));
        expectedInvestScores.add(new TdpIUnit(LocalDate.of(1990,2,6), (double)200.50));
    }

    @Test
    public void parseCsvFileWithTwoRecordsToInvestScoreModelTest() throws IOException {
        List<TdpIUnit> investScoreList = csvToModelParser.parse();
        assertTrue("List should contain expected investScores",
                expectedInvestScores.containsAll(investScoreList));
    }
}
