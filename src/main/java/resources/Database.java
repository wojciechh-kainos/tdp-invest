package resources;

import java.util.List;

/**
 * Created by radoslawl on 08/07/16.
 */
public interface Database {
    void addRow(Row row);
    List<Row> getAllRows();
}
