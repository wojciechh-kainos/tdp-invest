package resources;

import auth.TdpInvestAuthenticator;
import com.google.common.base.Optional;
import dao.TdpUserDAO;
import domain.TdpUser;
import io.dropwizard.auth.AuthenticationException;
import org.hibernate.HibernateException;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import javax.ws.rs.core.Response;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestAuthResourceTest {

    @Mock
    TdpUserDAO mockDAO;

    @Mock
    TdpInvestAuthenticator mockAuthenticator;

    TdpInvestAuthResource resource;

    private static TdpUser stubUser;

    @BeforeClass
    public static void setUpStub() {
        stubUser = new TdpUser("a@test", "a");
    }

    @Before
    public void setUp() { resource = new TdpInvestAuthResource(mockAuthenticator, mockDAO); }

    @Test
    public void testLoginWithValidCredentials() throws AuthenticationException {
        when(mockAuthenticator.authenticate(any())).thenReturn(Optional.of(stubUser));

        Response response = resource.login(stubUser);

        assertEquals(response.getStatus(), Response.Status.ACCEPTED.getStatusCode());
        verify(mockAuthenticator, times(1)).authenticate(any());
    }

    @Test
    public void testLoginWithInvalidCredentials() throws AuthenticationException {
        when(mockAuthenticator.authenticate(any())).thenReturn(Optional.absent());

        Response response = resource.login(stubUser);

        assertEquals(response.getStatus(), Response.Status.UNAUTHORIZED.getStatusCode());
        verify(mockAuthenticator, times(1)).authenticate(any());
    }

    @Test
    public void testRegisterWithValidCredentials() {
        when(mockDAO.create(any())).thenReturn(1L);

        Response response = resource.register(stubUser);

        assertEquals(response.getStatus(), Response.Status.CREATED.getStatusCode());
        verify(mockDAO, times(1)).create(any());
    }

    @Test
    public void testRegisterWithAlreadyExistingCredentials() {
        // hibernate throws exception when trying to add entity with non-unique id
        when(mockDAO.create(any())).thenThrow(new HibernateException(""));

        Response response = resource.register(stubUser);

        assertEquals(response.getStatus(), Response.Status.CONFLICT.getStatusCode());
        verify(mockDAO, times(1)).create(any());
    }

}
