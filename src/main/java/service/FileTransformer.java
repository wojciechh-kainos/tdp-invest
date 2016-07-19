package service;

import liquibase.util.csv.opencsv.CSVReader;
import liquibase.util.csv.opencsv.CSVWriter;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by radoslawl on 18/07/16.
 */
public class FileTransformer {

    private static final Logger logger = LogManager.getLogger(FileTransformer.class);

    public void transformFile() {
        try {
            DateTransformer tra = new DateTransformer();
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
                    Date myDate = tra.getDate(lineAsList.get(0));
                    SimpleDateFormat sdf = new SimpleDateFormat(tra.dateFromHtmlFormat);
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
