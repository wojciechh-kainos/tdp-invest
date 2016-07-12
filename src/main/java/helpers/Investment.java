package helpers;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class Investment extends TimeSeries {
    @Override
    public double profitInterval(Date start, Date end, double amount, double annualRate){
        long ms = end.getTime() - start.getTime();
        long days = TimeUnit.DAYS.toDays(ms);
        double fv = amount * Math.pow(1 + annualRate / 365.25, days);

        return fv;
    }
}
