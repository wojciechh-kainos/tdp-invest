package helpers;

public class Fund extends TimeSeries {
    @Override
    public double profitInterval(double valStart, double valEnd, double amount){
        return amount + amount * Math.log(valEnd / valStart);
    }
}
