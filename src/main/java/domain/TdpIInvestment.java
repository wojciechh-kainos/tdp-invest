package domain;

import org.joda.time.DateTime;

import javax.persistence.*;
import java.util.Date;

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

    private Date startDate;

    private Date endDate;

    private double amount;

    private double annualRate;
    //</editor-fold>

    //<editor-fold desc="constructors">
    public TdpIInvestment(){}

    public TdpIInvestment(Long id){
        this.id = id;
    }

    public TdpIInvestment(Long id, Date startDate, Date endDate, double amount, double annualRate){
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.annualRate = annualRate;
    }

    //</editor-fold>

    //<editor-fold desc="getter/setter">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
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

//    @Override
//    public String toString(){
//        return "id: " + this.id +
//                " | " + startDate == null ? "null" : startDate.toString("yyyy-MM-dd") +
//                " | " + endDate == null ? "null" : endDate.toString("yyyy-MM-dd") +
//                " | $" + String.format("%.2f", this.amount) +
//                " | " + String.format("%.2f", this.annualRate * 100) + "%";
//    }

}
