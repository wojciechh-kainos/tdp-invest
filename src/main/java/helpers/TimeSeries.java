package helpers;

import model.Fund;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class TimeSeries {
    public List<Fund> createTimeSeries(Date startDate, Date endDate, double amount, double annualRate){
        return Stream
                .iterate(startDate, date -> addDays(date, 1))
                .limit(datesDiffInDays(startDate, endDate) + 1)
                .skip(1)
                .map(row -> new Fund(row, futureValue(datesDiffInDays(startDate, row), amount, annualRate)))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private Date addDays(Date date, int days) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days);

        return cal.getTime();
    }

    private double futureValue(long days, double amount, double annualRate){
        return amount * Math.pow(1 + annualRate / 365.25, days);
    }

    private long datesDiffInDays(Date startDate, Date endDate){
        return TimeUnit.DAYS.convert(endDate.getTime() - startDate.getTime(), TimeUnit.MILLISECONDS);
    }
}
