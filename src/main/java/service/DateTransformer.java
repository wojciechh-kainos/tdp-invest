package service;

import liquibase.util.csv.opencsv.CSVReader;
import liquibase.util.csv.opencsv.CSVWriter;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.io.*;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DateTransformer {

    private static final Logger logger = LogManager.getLogger(DateTransformer.class);

    private static final String dateFormat = "dd/MM/yyyy";
    private static final String dateFromHtmlFormat = "yyyy-MM-dd";

    private Date transformDate(String dateAsString, String dateFormat) {
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        java.util.Date date = null;
        try {
            date = sdf.parse(dateAsString);
        } catch (ParseException e) {
            logger.error("The date cannot be parsed. Check your string format. [Should be: " + dateFormat + "]", e);
        }
        java.sql.Date sqlDate = new Date(date.getTime());
        return sqlDate;
    }

    public Date getDate(String dateAsString) {
        return transformDate(dateAsString, dateFormat);
    }

    public Date getDateFromHtml(String dateAsString) {
        return transformDate(dateAsString, dateFromHtmlFormat);
    }

     public void transformFile() {
        try {

            InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("changelogs/dataForChangelogs/data.csv");
            CSVReader reader = new CSVReader(new InputStreamReader(inputStream));

            CSVWriter writer = new CSVWriter(new FileWriter("src/main/resources/changelogs/dataForChangelogs/newdata.csv"));
            String [] nextLine;
            int i = 0;
            while ((nextLine = reader.readNext()) != null) {
                if(i == 0) {
                    writer.writeNext(nextLine);
                    i++;
                    continue;
                } else {
                    List<String> lineAsList = new ArrayList<String>(Arrays.asList(nextLine));
                    Date myDate = getDate(lineAsList.get(0));
                    SimpleDateFormat sdf = new SimpleDateFormat(dateFromHtmlFormat);
                    String formattedDate = sdf.format(myDate);
                    lineAsList.set(0, formattedDate);
                    writer.writeNext(lineAsList.toArray(new String[lineAsList.size()]));
                }
            }
        } catch (IOException e) {
            logger.error("CSV file parsing problem", e);
        }
    }
}