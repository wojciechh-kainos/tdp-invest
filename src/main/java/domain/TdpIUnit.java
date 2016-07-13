package domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "unit")
@NamedQueries({
		@NamedQuery(name = "TdpIUnit.findAll",
				query = "select u from TdpIUnit u")})
public class TdpIUnit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private LocalDate date;

	@NotNull
	private Double value;


	public TdpIUnit() {
	}

	public TdpIUnit(Long id, LocalDate date, Double value) {
		this.id = id;
		this.date = date;
		this.value = value;
	}

	public TdpIUnit(LocalDate date, double value) {
		this.date = date;
		this.value = value;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	@Override
	public boolean equals(Object tdpIUnitToCompare) {
		TdpIUnit tdpIUnit = (TdpIUnit)tdpIUnitToCompare;
		if(this.date.isEqual(tdpIUnit.date) &&
				Objects.equals(this.value, tdpIUnit.value))
			return true;
		return false;
	}
}
