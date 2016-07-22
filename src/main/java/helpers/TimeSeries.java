package helpers;

import org.joda.time.DateTime;
import org.json.JSONArray;
import org.json.JSONException;
import java.util.concurrent.TimeUnit;

public final class TimeSeries {
    public static String createTimeSeries(DateTime startDate, DateTime endDate, double amount, double annualRate) throws JSONException {
        DateTime date=startDate;
        double value;
        JSONArray point;
        JSONArray output = new JSONArray();

        while(!date.isAfter(endDate)){
            point = new JSONArray();
            value = futureValue(datesDiffInDays(startDate, date), amount, annualRate);
            point.put(date.getMillis());
            point.put(value);
            output.put(point);
            date = date.plusDays(1);
        }
        return output.toString();
    }

    private static double futureValue(long days, double amount, double annualRate){
        return amount * Math.pow(1 + annualRate / 365.25, days + 1);
    }

    private static long datesDiffInDays(DateTime startDate, DateTime endDate){
        return TimeUnit.DAYS.convert(endDate.getMillis() - startDate.getMillis(), TimeUnit.MILLISECONDS);
    }
}
