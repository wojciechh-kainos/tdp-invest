package domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "unit")
@NamedQueries({
		@NamedQuery(name = "TdpIUnit.findAll",
				query = "select u from TdpIUnit u"),
		@NamedQuery(name = "TdpIUnit.findDatesBetween",
					query = "select u from TdpIUnit u where u.date between :start and :end")

})
public class TdpIUnit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Date date;

	@NotNull
	private Double value;

	private Double incomeFromFund;

	private Double incomeFromInvestment;


	public TdpIUnit() {
	}

	public TdpIUnit(Long id, Date date, Double value, Double incomeFromFund, Double incomeFromInvestment) {
		this.id = id;
		this.date = date;
		this.value = value;
		this.incomeFromFund = incomeFromFund;
		this.incomeFromInvestment = incomeFromInvestment;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	public Double getIncomeFromInvestment() {
		return incomeFromInvestment;
	}

	public void setIncomeFromInvestment(Double incomeFromInvestment) {
		this.incomeFromInvestment = incomeFromInvestment;
	}

	public Double getIncomeFromFund() {
		return incomeFromFund;
	}

	public void setIncomeFromFund(Double incomeFromFund) {
		this.incomeFromFund = incomeFromFund;
	}
}
