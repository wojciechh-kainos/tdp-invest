package domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "unit")
@NamedQueries({
		@NamedQuery(name = "TdpIUnit.findAll", query = "select u from TdpIUnit u")
})
public class TdpIUnit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Date date;

	@NotNull
	private Double value;


	public TdpIUnit() {
	}

	public TdpIUnit(Long id, Date date, Double value) {
		this.id = id;
		this.date = date;
		this.value = value;
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
}
