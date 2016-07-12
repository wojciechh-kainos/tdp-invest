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

    public RowRepositoryMemoryImpl() {
        repo.add(new Row(new Date(), new BigDecimal(12)));
        repo.add(new Row(new Date(), new BigDecimal(244)));
        repo.add(new Row(new Date(), new BigDecimal(1124)));
        repo.add(new Row(new Date(), new BigDecimal(54)));
        repo.add(new Row(new Date(), new BigDecimal(722)));
        repo.add(new Row(new Date(), new BigDecimal(555)));
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
