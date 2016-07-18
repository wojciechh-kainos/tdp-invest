package services;

import com.google.inject.Singleton;
import domain.TdpIUnit;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class CSVReader {

    public List<TdpIUnit> readCSV(InputStream fileInputStream) {

        List<TdpIUnit> tdpUnitList = new ArrayList<>();
        BufferedReader fileReader = null;
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        final String DELIMITER = ",";

        try {
            String line = "";
            fileReader = new BufferedReader(new InputStreamReader(fileInputStream));

            while ((line = fileReader.readLine()) != null) {
                String[] tokens = line.split(DELIMITER);

                TdpIUnit tdpIUnit = new TdpIUnit();

                tdpIUnit.setDate(sdf.parse(tokens[0]));
                tdpIUnit.setValue(Double.parseDouble(tokens[1]));

                tdpUnitList.add(tdpIUnit);

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                fileReader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return tdpUnitList;

    }
}
