package services;

import DAO.TdpIUnitDAO;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import domain.TdpIUnit;

import java.util.List;

@Singleton
public class TdpInvestLoadDataService {
  private TdpIUnitDAO tdpIUnitDAO;
  private TdpInvestReadCSVFileService csvReader;

  @Inject
  public TdpInvestLoadDataService(TdpIUnitDAO tdpIUnitDAO, TdpInvestReadCSVFileService csvReader) {
    this.tdpIUnitDAO = tdpIUnitDAO;
    this.csvReader = csvReader;
  }

  public void saveFromLocalFile() {
    List<TdpIUnit> unitList = csvReader.readCSVFile("/Users/malgorzatar/projects/tdp-invest/src/main/resources/data.csv");
    for ( int i = 0; i < unitList.size(); i++ ) {
      tdpIUnitDAO.add(unitList.get(i));
      }
    }
  }


