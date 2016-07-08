package resources;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by radoslawl on 08/07/16.
 */
public class LameDatabaseInitializer implements DatabaseInitializer {

    @Override
    public void initializeDatabase(Database db) {

        Date date = new Date();
        BigDecimal val = new BigDecimal(120);

        Row row1 = new Row(date, val);

        db.addRow(row1);
        db.addRow(row1);
        db.addRow(row1);

    }
}
