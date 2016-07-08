package resources;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by radoslawl on 08/07/16.
 */
public class CalculatedRow {
    private Date date;
    private BigDecimal fundVal;
    private BigDecimal depositVal;

    public CalculatedRow(Date myDate, BigDecimal myFundVal, BigDecimal myDepositVal) {
        date = myDate;
        fundVal = myFundVal;
        depositVal = myDepositVal;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public BigDecimal getFundVal() {
        return fundVal;
    }

    public void setFundVal(BigDecimal fundVal) {
        this.fundVal = fundVal;
    }

    public BigDecimal getDepositVal() {
        return depositVal;
    }

    public void setDepositVal(BigDecimal depositVal) {
        this.depositVal = depositVal;
    }

    @Override
    public String toString() {
        return "CalculatedRow{" +
                "date=" + date +
                ", fundVal=" + fundVal +
                ", depositVal=" + depositVal +
                '}';
    }
}
