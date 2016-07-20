package services;

import com.google.inject.Singleton;
import domain.TdpIUnit;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Singleton
public class TdpInvestReadCSVFileService {

  public List<TdpIUnit> readCSVFile(Optional<InputStream> fileInputStream) {
    BufferedReader fileReader = null;
    final String DELIMITER = ",";
    final String FILE_PATH = "/Users/malgorzatar/projects/tdp-invest/src/main/resources/data.csv";
    List<TdpIUnit> unitList = new ArrayList<>();

    String datePattern = "^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\\d{4}$";
    String valuePattern = "^\\d+[\\.]?\\d+$";
    SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

    try {

      if (fileInputStream.isPresent()) {
        InputStreamReader isr = new InputStreamReader(fileInputStream.get());
        fileReader = new BufferedReader(isr);
      }
      else {
       fileReader = new BufferedReader(new FileReader(FILE_PATH));
      }


      String line = "";

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

