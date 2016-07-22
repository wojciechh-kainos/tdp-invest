package domain;

import javax.persistence.*;
import java.security.Principal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "TdpUser")
@NamedQueries({
        @NamedQuery(name = "TdpUser.delete",
                query = "delete from TdpUser where email = :email")})
public class TdpUser implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false)
    private long id;

    @Column(name = "EMAIL", unique = true, nullable = false, length = 100)
    private String mail;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "TOKEN", length = 50)
    private String token;

    @Column(name = "TOKEN_EXPIRE")
    private ZonedDateTime tokenExpire;

    public TdpUser(){};

    public TdpUser(String mail, String password) { this.mail = mail; this.password = password; }

    public long getId() { return id; }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public ZonedDateTime getTokenExpire() {
        return tokenExpire;
    }

    public void setTokenExpire(ZonedDateTime tokenExpire) {
        this.tokenExpire = tokenExpire;
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
