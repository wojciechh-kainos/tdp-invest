package domain;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.security.Principal;

@Entity
@Table(name = "TdpUser")
public class TdpUser implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false)
    private long id;

    @NaturalId
    @Column(name = "EMAIL", unique = true, nullable = false, length = 100)
    private String mail;

    @NotNull
    @Column(name = "PASSWORD", nullable = false)
    private String password;

    public TdpUser() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getName() {
        return mail;
    }
}