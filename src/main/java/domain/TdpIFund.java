package domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "fund")
@NamedQueries({
        @NamedQuery(name = "tdpIFund.findAll",
                query = "select u from TdpIFund u")})

public class TdpIFund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fund_id;

    @NotNull
    private String name;

    @NotNull
    private String shortcut;

    public TdpIFund() {
    }

    public TdpIFund(Long fund_id, String name, String shortcut) {
        this.fund_id = fund_id;
        this.name = name;
        this.shortcut = shortcut;
    }

    public Long getId() {
        return fund_id;
    }

    public void setId(Long fund_id) {
        this.fund_id = fund_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortcut() {
        return shortcut;
    }

    public void setShortcut(String shortcut) {
        this.shortcut = shortcut;
    }
}
