package helpers;

import model.Fund;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


public abstract class TimeSeries {
    public List<Fund> timeSeries;

    public List<Fund> filterByDate(List<Fund> ts, Date startDate, Date endDate){
        return ts
                .stream()
                .filter(row -> row.getDate().after(startDate) && row.getDate().before(endDate))
                .collect(Collectors.toList());
    }

    public double profitInterval(double valStart, double valEnd, double amount){
        throw new IllegalArgumentException();
    }

    public double profitInterval(Date start, Date end, double amount, double annualRate){
        throw new IllegalArgumentException();
    }
}
