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
    private String pathToEmptyFile = "/testAssets/investScoresEmptyTest.csv";
    private String pathToEmptyWithHeaderFile = "/testAssets/investScoresEmptyWithHeaderTest.csv";

    @Test
    public void parseEmptyCsvFileToTdpIUnitTest() throws IOException {
        csvToModelParser = new CsvToModelParser(pathToEmptyFile);
        List<TdpIUnit> tdpIUnitList = csvToModelParser.parse();
        assertTrue("List should not contain any records", tdpIUnitList.isEmpty());
    }

    @Test
    public void parseEmptyWithHeadersCsvFileToTdpIUnitTest() throws IOException {
        csvToModelParser = new CsvToModelParser(pathToEmptyWithHeaderFile);
        List<TdpIUnit> investScoreList = csvToModelParser.parse();
        assertTrue("List should not contain any records", investScoreList.isEmpty());
    }
}
