package domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "fund")
@NamedQueries({
        @NamedQuery(name = "tdpIFund.findAll",
                query = "select u from TdpIFund u")})

public class TdpIFund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fund_id;

    public Long getId() {
        return fund_id;
    }

    public void setId(Long fund_id) {
        this.fund_id = fund_id;
    }

    @Column (name = "name")
    @NotNull
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column (name = "shortcut")
    @NotNull
    private String shortcut;

    public String getShortcut() {
        return shortcut;
    }

    public void setShortcut(String shortcut) {
        this.shortcut = shortcut;
    }

    @Column (name = "code")
    @OneToMany(mappedBy="fund")
    @ElementCollection(targetClass=TdpIUnit.class)
    private List<TdpIUnit> units;

    public List<TdpIUnit> getUnits() {
        return units;
    }

    public void setUnits(List<TdpIUnit> units) {
        this.units = units;
    }

    public TdpIFund() {
    }

    public TdpIFund(Long fund_id, String name, String shortcut) {
        this.fund_id = fund_id;
        this.name = name;
        this.shortcut = shortcut;
    }

}
