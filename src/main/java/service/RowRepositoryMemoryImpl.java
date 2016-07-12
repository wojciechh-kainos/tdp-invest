package service;

import api.Row;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by radoslawl on 12/07/16.
 */
public class RowRepositoryMemoryImpl implements RowRepository {

    private List<Row> repo = new ArrayList<>();

    private DateTransformer tra = new DateTransformer();

    public RowRepositoryMemoryImpl() {
        repo.add(new Row(tra.getDate("12/02/2013"), new BigDecimal(12)));
        repo.add(new Row(tra.getDate("13/02/2013"), new BigDecimal(244)));
        repo.add(new Row(tra.getDate("14/02/2013"), new BigDecimal(1124)));
        repo.add(new Row(tra.getDate("15/02/2013"), new BigDecimal(54)));
        repo.add(new Row(tra.getDate("16/02/2013"), new BigDecimal(722)));
        repo.add(new Row(tra.getDate("17/02/2013"), new BigDecimal(555)));
    }

    @Override
    public List<Row> getRowsByDate(Date startDate, Date endDate) {
        return repo;
    }

    @Override
    public List<Row> getAllRows() {
        return repo;
    }
}
