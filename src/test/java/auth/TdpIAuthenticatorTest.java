package auth;

import DAO.TdpIUserDAO;
import com.google.common.base.Optional;
import domain.TdpIRole;
import domain.TdpIUser;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.basic.BasicCredentials;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpIAuthenticatorTest {

  //SUT
  TdpIAuthenticator resource;

  @Mock
  TdpIUserDAO mockUserDAO;

  private static List<TdpIUser> stubDB;

  @Before
  public void setUp() {
    resource = new TdpIAuthenticator(mockUserDAO);
  }

  @Test
  public void authenticateTest() throws AuthenticationException {
    TdpIUser user = new TdpIUser(1L,"Jan", "pass", TdpIRole.USER);

    when(mockUserDAO.findByUsername(user.getUsername())).thenReturn(user);
    when(mockUserDAO.findByUsername("Andrzej")).thenReturn(null);

    assertEquals(Optional.of(user),resource.authenticate(new BasicCredentials(user.getUsername(), user.getPassword())));
    assertEquals(Optional.absent(),resource.authenticate(new BasicCredentials("Andrzej", "password")));

    verify(mockUserDAO, times(1)).findByUsername(user.getUsername());
    verify(mockUserDAO, times(1)).findByUsername("Andrzej");
  }
 }
