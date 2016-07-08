package helpers;

public class Fund extends Finance {
    @Override
    public double ProfitInterval(double valStart, double valEnd, double amount){
        return amount + amount * Math.log(valEnd / valStart);
    }
}
