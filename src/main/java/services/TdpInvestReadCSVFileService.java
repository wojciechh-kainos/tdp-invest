package services;

import com.google.inject.Singleton;
import domain.TdpIUnit;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class TdpInvestReadCSVFileService {

  public List<TdpIUnit> readCSVFile(String fileName) {
    BufferedReader fileReader = null;
    final String DELIMITER = ",";

    List<TdpIUnit> unitList = new ArrayList<>();

    String datePattern = "^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\\d{4}$";
    String valuePattern = "^\\d+[\\.]?\\d+$";
    SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

    try {
      String line = "";

      fileReader = new BufferedReader(new FileReader(fileName));

      while ((line = fileReader.readLine()) != null) {
        String[] tokens = line.split(DELIMITER);

        TdpIUnit unit = new TdpIUnit();

        if(tokens[0].matches(datePattern) && tokens[1].matches(valuePattern)) {

          unit.setDate(dateFormat.parse(tokens[0]));
          System.out.println(dateFormat.parse(tokens[0]));
          unit.setValue(Double.parseDouble(tokens[1]));

          unitList.add(unit);
        }

      }
    }
    catch (Exception e) {
      e.printStackTrace();
    }
    finally {
      try {
        fileReader.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    return unitList;
  }

}
