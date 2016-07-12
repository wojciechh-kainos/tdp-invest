package services;

import model.InvestScore;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.log4j.Logger;

import java.io.*;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by malgorzatas on 11/07/16.
 */
public class CsvToModelParser {

    private Reader reader = null;
    private final String dateHeader = "Date";
    private final String valueHeader = "Value";
    private final int HEADER = 1;
    private static Logger log;


    public CsvToModelParser(String path) throws FileNotFoundException {
        log = Logger.getLogger(getClass().getName());
        URL url = getClass().getResource(path);
        if (url != null) {
            reader = new FileReader(url.getPath());
        }else{
            throw new FileNotFoundException("File not found: " + path);
        }
    }

    public List<InvestScore> parse() throws IOException {
        List<InvestScore> investScores = new ArrayList<>();

        Iterable<CSVRecord> records = CSVFormat.RFC4180.withHeader(dateHeader, valueHeader).parse(reader);
        for (CSVRecord record : records) {
            if(record.getRecordNumber() != HEADER){
                LocalDate date = prepareDate(record.get(dateHeader));
                if(date != null)
                    investScores.add(new InvestScore(date,
                            Float.parseFloat(record.get(valueHeader))));
            }
        }
        return investScores;
    }

    private LocalDate prepareDate(String date) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        try{
            return LocalDate.parse(date, dateTimeFormatter);
        }catch (Exception exception){
            log.error("RECORD WAS INGNORED: Incorrect date format", exception);
            return null;
        }
    }
}
