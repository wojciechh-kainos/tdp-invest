package service;

import api.Row;

import java.util.Date;
import java.util.List;

/**
 * Created by radoslawl on 12/07/16.
 */
public interface RowRepository {
    List<Row> getRowsByDate(Date startDate, Date endDate);
    List<Row> getAllRows();
}
