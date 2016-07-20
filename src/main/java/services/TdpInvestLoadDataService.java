package services;

import DAO.TdpIUnitDAO;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import domain.TdpIUnit;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Singleton
public class TdpInvestLoadDataService {
  private TdpIUnitDAO tdpIUnitDAO;
  private TdpInvestReadCSVFileService csvReader;

  @Inject
  public TdpInvestLoadDataService(TdpIUnitDAO tdpIUnitDAO, TdpInvestReadCSVFileService csvReader) {
    this.tdpIUnitDAO = tdpIUnitDAO;
    this.csvReader = csvReader;
  }

  public void loadFromLocalFile() {
    tdpIUnitDAO.deleteAll();
    List<TdpIUnit> unitList = csvReader.readCSVFile(Optional.empty());
    for (int i = 0; i < unitList.size(); i++) {
      tdpIUnitDAO.add(unitList.get(i));
    }
  }


  public void loadFromUploadedFile(InputStream fileInputStream) {
    tdpIUnitDAO.deleteAll();
    List<TdpIUnit> unitList = csvReader.readCSVFile(Optional.of(fileInputStream));
    for (int i = 0; i < unitList.size(); i++) {
      tdpIUnitDAO.add(unitList.get(i));
      System.out.print(unitList.get(i).getValue() + " ");
    }
  }

}
