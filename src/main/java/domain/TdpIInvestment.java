package domain;

import org.joda.time.DateTime;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.ws.rs.FormParam;

@Entity
@Table(name = "investment")
@NamedQueries({
        @NamedQuery(name = "TdpIInvestment.findAll", query = "select u from TdpIInvestment u")
})
public class TdpIInvestment {
    //<editor-fold desc="fields">
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private DateTime startDate;
    private DateTime endDate;
    private double amount;
    private double annualRate;
    //</editor-fold>

    //<editor-fold desc="constructors">
    public TdpIInvestment(){}

    public TdpIInvestment(Long id, DateTime startDate, DateTime endDate, double amount, double annualRate){
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.annualRate = annualRate;
    }

    //</editor-fold>

    //<editor-fold desc="getter/setter">
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public DateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(DateTime startDate) {
        this.startDate = startDate;
    }

    public DateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(DateTime endDate) {
        this.endDate = endDate;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getAnnualRate() {
        return annualRate;
    }

    public void setAnnualRate(double annualRate) {
        this.annualRate = annualRate;
    }
    //</editor-fold>

    @Override
    public String toString(){
        return "id: " + this.id +
                " | " + startDate.toString("yyyy-MM-dd") +
                " | " + endDate.toString("yyyy-MM-dd") +
                " | $" + String.format("%.2f", this.amount) +
                " | " + String.format("%.2f", this.annualRate * 100) + "%";
    }
}
