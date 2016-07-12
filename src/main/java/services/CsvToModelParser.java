package services;

import model.InvestScore;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
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

    public CsvToModelParser(String path) throws FileNotFoundException {
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
                investScores.add(new InvestScore(prepareDate(record.get(dateHeader)),
                        Integer.parseInt(record.get(valueHeader))));
            }
        }
        return investScores;
    }

    private LocalDate prepareDate(String date) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return  LocalDate.parse(date, dateTimeFormatter);
    }
}
