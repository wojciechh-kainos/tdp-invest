package services;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import dao.TdpIUnitDAO;
import domain.TdpIUnit;

import java.io.InputStream;
import java.util.List;

@Singleton
public class DataLoader {
    private TdpIUnitDAO dao;
    private CSVReader csvReader;

    @Inject
    public DataLoader(TdpIUnitDAO dao, CSVReader csvReader) {
        this.dao = dao;
        this.csvReader = csvReader;
    }

    public void loadData(InputStream fileInputStream) {
        List<TdpIUnit> tdpUnitList = csvReader.readCSV(fileInputStream);

        dao.bulkAdd(tdpUnitList);
//        for (TdpIUnit unit : tdpUnitList) {
//            dao.create(unit);
//        }

    }
}
