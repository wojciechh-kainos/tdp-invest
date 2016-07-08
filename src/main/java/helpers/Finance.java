package helpers;

import java.util.Date;

public abstract class Finance {
    public double currentValue;

    public double ProfitInterval(double valStart, double valEnd, double amount){
        throw new IllegalArgumentException();
    }

    public double ProfitInterval(Date start, Date end, double amount, double annualRate){
        throw new IllegalArgumentException();
    }
}
