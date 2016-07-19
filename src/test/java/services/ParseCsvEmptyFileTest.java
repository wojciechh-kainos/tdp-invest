package services;

import domain.TdpIUnit;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

import static junit.framework.TestCase.assertTrue;

/**
 * Created by malgorzatas on 12/07/16.
 */
public class ParseCsvEmptyFileTest {

    private CsvToModelParser csvToModelParser;

    @Test
    public void parseEmptyCsvFileToTdpIUnitTest() throws IOException {
        String pathToEmptyFile = getClass().getResource("/testAssets/investScoresEmptyTest.csv").getPath();
        csvToModelParser = new CsvToModelParser(pathToEmptyFile);
        List<TdpIUnit> tdpIUnitList = csvToModelParser.parse();
        assertTrue("List should not contain any records", tdpIUnitList.isEmpty());
    }

    @Test
    public void parseEmptyWithHeadersCsvFileToTdpIUnitTest() throws IOException {
        String pathToEmptyWithHeaderFile = getClass().getResource("/testAssets/investScoresEmptyWithHeaderTest.csv").getPath();
        csvToModelParser = new CsvToModelParser(pathToEmptyWithHeaderFile);
        List<TdpIUnit> investScoreList = csvToModelParser.parse();
        assertTrue("List should not contain any records", investScoreList.isEmpty());
    }
}
