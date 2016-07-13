package helpers;

import model.Fund;
import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class TimeSeries {
    List<Fund> timeSeries;

    public TimeSeries(DateTime startDate, DateTime endDate, double amount, double annualRate){
        this.timeSeries = createTimeSeries(startDate, endDate, amount, annualRate);
    }

    public List<Fund> getTimeSeries(){
        return this.timeSeries;
    }

    private List<Fund> createTimeSeries(DateTime startDate, DateTime endDate, double amount, double annualRate){
        return Stream
                .iterate(startDate, date -> date.plusDays(1))
                .limit(datesDiffInDays(startDate, endDate) + 2)
                .skip(1)
                .map(row -> new Fund(row, futureValue(datesDiffInDays(startDate, row), amount, annualRate)))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private double futureValue(long days, double amount, double annualRate){
        return amount * Math.pow(1 + annualRate / 365.25, days + 1);
    }

    private long datesDiffInDays(DateTime startDate, DateTime endDate){
        return TimeUnit.DAYS.convert(endDate.getMillis() - startDate.getMillis(), TimeUnit.MILLISECONDS);
    }
}
