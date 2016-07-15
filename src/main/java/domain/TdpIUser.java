package domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.security.Principal;

@Entity
@Table(name="users")
@NamedQueries({
		@NamedQuery(name = "TdpIUser.findByUsername",
				query = "select u from TdpIUser u where username = :username")})
public class TdpIUser implements Principal{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String username;

	@NotNull
	private String password;

	@Enumerated(EnumType.STRING)
	private TdpIRole role;

	public TdpIUser() {
	}

	public TdpIUser(Long id, String username, String password, TdpIRole role) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public TdpIRole getRole() {
		return role;
	}

	public void setRole(TdpIRole role) {
		this.role = role;
	}

	@Override
	public String getName() {
		return username;
	}
}

