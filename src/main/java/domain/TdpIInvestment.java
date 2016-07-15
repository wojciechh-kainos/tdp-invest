package domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "investment")
@NamedQueries({
        @NamedQuery(name = "TdpIInvestment.findAll", query = "select u from TdpIInvestment u"),
        @NamedQuery(name = "TdpIInvestment.findBetween",
                query = "select u from TdpIInvestment u where (u.startDate >= :startDate or :startDate is null)")
})
public class TdpIInvestment {
    //<editor-fold desc="fields">
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //@NotNull
    private Date startDate;

    //@NotNull
    private Date endDate;

    @NotNull
    private double amount;

    @NotNull
    private double annualRate;
    //</editor-fold>

    //<editor-fold desc="constructors">
    public TdpIInvestment(){}

    public TdpIInvestment(Long id, Date startDate, Date endDate, double amount, double annualRate){
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
}
