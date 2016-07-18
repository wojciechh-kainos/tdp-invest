package domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "unit")
@NamedQueries({
		@NamedQuery(name = "TdpIUnit.findAll",
				query = "select u from TdpUnit u"),
		@NamedQuery(name = "TdpIUnit.onlyData",
				query = "select u.date, u.value from TdpUnit u"),
		@NamedQuery(name = "TdpIUnit.getUnits",
				query = "select u.date, u.value from TdpUnit u where u.fund = :fund"),
		@NamedQuery(name = "TdpIUnit.selectDate",
				query = "select u.date, u.value from TdpUnit u where u.date >= :date_start and u.date <= :date_end and u.fund = :fund_id")
})

public class TdpUnit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@ManyToOne
	@JoinColumn(name="fund_id")
	private TdpFund fund;

	public TdpFund getFund() {
		return fund;
	}

	public void setFund(TdpFund fund) {
		this.fund = fund;
	}

	@NotNull
	private Date date;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@NotNull
	private Double value;

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}


	public TdpUnit() {
	}

	public TdpUnit(Long id, Date date, Double value) {
		this.id = id;
		this.date = date;
		this.value = value;
	}

	public TdpUnit(Long id, Date date, Double value, TdpFund fund) {
		this.id = id;
		this.date = date;
		this.value = value;
		this.fund = fund;
	}

}
