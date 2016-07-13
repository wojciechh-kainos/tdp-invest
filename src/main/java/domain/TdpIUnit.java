package domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "unit")
@NamedQueries({
		@NamedQuery(name = "TdpIUnit.findAll",
				query = "select u from TdpIUnit u"),
		@NamedQuery(name = "TdpIUnit.onlyData",
				query = "select u.date, u.value from TdpIUnit u"),
		@NamedQuery(name = "TdpIUnit.getUnits",
				query = "select u.date, u.value from TdpIUnit u where u.fund = :fund")
})

public class TdpIUnit {
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
	private TdpIFund fund;

	public TdpIFund getFund() {
		return fund;
	}

	public void setFund(TdpIFund fund) { this.fund = fund; }

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


	public TdpIUnit() {
	}

	public TdpIUnit(Long id, Date date, Double value) {
		this.id = id;
		this.date = date;
		this.value = value;
	}

	public TdpIUnit(Long id, Date date, Double value, TdpIFund fund) {
		this.id = id;
		this.date = date;
		this.value = value;
		this.fund = fund;
	}

}
