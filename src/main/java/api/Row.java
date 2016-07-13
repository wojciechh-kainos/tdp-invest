package api;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by radoslawl on 08/07/16.
 */

public class Row {
    private Date date;
    private BigDecimal value;

    public Row(Date myDate, BigDecimal myValue) {
        date = myDate;
        value = myValue;
    }

    public Row(){}

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Row{" +
                "date=" + date +
                ", value=" + value +
                '}';
    }
}
