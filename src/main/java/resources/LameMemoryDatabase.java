package resources;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by radoslawl on 08/07/16.
 */
public class LameMemoryDatabase implements Database {

    List<Row> rows;

    public LameMemoryDatabase() {
        rows = new ArrayList<>();
    }

    @Override
    public void addRow(Row row) {
        rows.add(row);
    }

    @Override
    public List<Row> getAllRows() {
        return rows;
    }
}
