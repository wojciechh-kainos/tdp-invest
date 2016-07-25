package resources;

import DAO.TdpIUserDAO;
import auth.TdpIAuthenticator;
import com.google.common.base.Optional;
import domain.TdpIRole;
import domain.TdpIUser;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.basic.BasicCredentials;
import org.hibernate.HibernateException;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestAuthResourceTest {

  //SUT
  TdpInvestAuthResource resource;

  @Mock
  TdpIUserDAO mockUserDAO;
  @Mock
  TdpIAuthenticator mockAuthenticator;

  private static List<TdpIUser> stubDB;

  @BeforeClass
  public static void setUpStub() {
    stubDB = new ArrayList<>();
    stubDB.add(new TdpIUser(1L,"Jan", "pass", TdpIRole.USER));
    stubDB.add(new TdpIUser(2L,"Kowalski", "pass", TdpIRole.USER));
  }

  @Before
  public void setUp() {
    resource = new TdpInvestAuthResource(mockUserDAO, mockAuthenticator);
  }

  @Test
  public void testLogin() throws AuthenticationException {
    TdpIUser user = new TdpIUser(1L,"Jan", "pass", TdpIRole.USER);
    TdpIUser user2 = new TdpIUser(2L,"NieJan", "pass", TdpIRole.USER);

    when(mockAuthenticator.authenticate(new BasicCredentials(user.getName(), user.getPassword())))
            .thenReturn(Optional.of(user));

    when(mockAuthenticator.authenticate(new BasicCredentials(user2.getName(), user2.getPassword())))
            .thenReturn(Optional.absent());

    assertEquals(Response.Status.ACCEPTED.getStatusCode(), resource.login(user).getStatus());
    assertEquals(Response.Status.UNAUTHORIZED.getStatusCode(), resource.login(user2).getStatus());

    verify(mockAuthenticator, atMost(1)).authenticate(new BasicCredentials(user.getName(), user.getPassword()));
    verify(mockAuthenticator, atMost(1)).authenticate(new BasicCredentials(user2.getName(), user2.getPassword()));
  }

  @Test
  public void testRegister() {
    TdpIUser user = new TdpIUser(1L,"Jan", "pass", TdpIRole.USER);
    TdpIUser newUser = new TdpIUser(3L,"NewUser", "pass", TdpIRole.USER);

    when(mockUserDAO.create(newUser)).thenReturn(3L);
    when(mockUserDAO.create(user)).thenThrow(new HibernateException("User already exists"));

    assertEquals(Response.Status.CONFLICT.getStatusCode(), resource.register(user).getStatus());
    assertEquals(Response.Status.CREATED.getStatusCode(), resource.register(newUser).getStatus());

    verify(mockUserDAO, atLeast(1)).create(newUser);
    verify(mockUserDAO, atLeast(1)).create(user);
  }
}
