package services;

import model.InvestScore;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

import static junit.framework.TestCase.assertTrue;

/**
 * Created by malgorzatas on 12/07/16.
 */
public class ParseCsvEmptyFileTest {

    private CsvToModelParser csvToModelParser;
    private String pathToEmptyFile = "/testAssets/investScoresEmptyTest.csv";
    private String pathToEmptyWithHeaderFile = "/testAssets/investScoresEmptyWithHeaderTest.csv";

    @Test
    public void parseEmptyCsvFileToInvestScoreModelTest() throws IOException {
        csvToModelParser = new CsvToModelParser(pathToEmptyFile);
        List<InvestScore> investScoreList = csvToModelParser.parse();
        assertTrue("List should not contain any scores", investScoreList.isEmpty());
    }

    @Test
    public void parseEmptyWithHeadersCsvFileToInvestScoreModelTest() throws IOException {
        csvToModelParser = new CsvToModelParser(pathToEmptyWithHeaderFile);
        List<InvestScore> investScoreList = csvToModelParser.parse();
        assertTrue("List should not contain any scores", investScoreList.isEmpty());
    }
}
