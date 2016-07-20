package domain;

import java.util.Date;

public class TdpIDateRange {
  private Date minDate;
  private Date maxDate;

  public TdpIDateRange(Date minDate, Date maxDate) {
    this.minDate = minDate;
    this.maxDate = maxDate;
  }

  public TdpIDateRange() {
  }

  public Date getMinDate() {
    return minDate;
  }

  public void setMinDate(Date minDate) {
    this.minDate = minDate;
  }

  public Date getMaxDate() {
    return maxDate;
  }

  public void setMaxDate(Date maxDate) {
    this.maxDate = maxDate;
  }
}
