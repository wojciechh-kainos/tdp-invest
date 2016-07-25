package auth;

import com.google.common.base.Optional;
import DAO.TdpUserDAO;
import domain.TdpUser;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.basic.BasicCredentials;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.time.ZonedDateTime;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestAuthenticatorTest {

    @Mock
    TdpUserDAO mockDAO;

    @Mock
    TdpInvestPasswordStore mockPasswordStore;

    TdpInvestAuthenticator authenticator;

    private static TdpUser stubDbUser;

    @Before
    public void setUp() throws TdpInvestPasswordStore.CannotPerformOperationException {
        stubDbUser = new TdpUser("a@a", "pass");
        authenticator = new TdpInvestAuthenticator(mockDAO, mockPasswordStore);
    }

    @Test
    public void testAuthenticationWithValidLogin() throws AuthenticationException, TdpInvestPasswordStore.InvalidHashException, TdpInvestPasswordStore.CannotPerformOperationException {
        when(mockDAO.getUserByEmail(any())).thenReturn(stubDbUser);
        when(mockPasswordStore.verifyPassword(anyString(), anyString())).thenReturn(true);

        Optional<TdpUser> result = authenticator.authenticate(new BasicCredentials("", ""));

        assertEquals(result.isPresent(), true);
        assertEquals(result.get(), stubDbUser);
        verify(mockDAO, times(1)).getUserByEmail(any());
    }

    @Test
    public void testAuthenticationWithValidToken() throws AuthenticationException, TdpInvestPasswordStore.InvalidHashException, TdpInvestPasswordStore.CannotPerformOperationException {
        stubDbUser.setToken("token");
        stubDbUser.setTokenExpire(ZonedDateTime.now().plusMinutes(10));

        when(mockDAO.getUserByEmail(any())).thenReturn(stubDbUser);

        Optional<TdpUser> result = authenticator.authenticate(new BasicCredentials("", "token"));

        assertEquals(result.isPresent(), true);
        verify(mockDAO, times(1)).getUserByEmail(any());
    }

    @Test
    public void testAuthenticationWithWrongEmail() throws AuthenticationException, TdpInvestPasswordStore.InvalidHashException, TdpInvestPasswordStore.CannotPerformOperationException {
        when(mockDAO.getUserByEmail(any())).thenReturn(null);

        Optional<TdpUser> result = authenticator.authenticate(new BasicCredentials("", ""));

        assertEquals(result.isPresent(), false);
        verify(mockDAO, times(1)).getUserByEmail(any());
        verify(mockPasswordStore, times(0)).verifyPassword(anyString(),anyString());
    }

    @Test
    public void testAuthenticationWithWrongTokenAndPassword() throws AuthenticationException, TdpInvestPasswordStore.InvalidHashException, TdpInvestPasswordStore.CannotPerformOperationException {
        when(mockDAO.getUserByEmail(any())).thenReturn(stubDbUser);
        when(mockPasswordStore.verifyPassword(anyString(), anyString())).thenReturn(false);

        Optional<TdpUser> result = authenticator.authenticate(new BasicCredentials("", ""));

        assertEquals(result.isPresent(), false);
        verify(mockDAO, times(1)).getUserByEmail(any());
        verify(mockPasswordStore, times(1)).verifyPassword(anyString(),anyString());
    }

    @Test
    public void testAuthenticationWithExpiredToken() throws AuthenticationException, TdpInvestPasswordStore.InvalidHashException, TdpInvestPasswordStore.CannotPerformOperationException {
        stubDbUser.setToken("token");
        stubDbUser.setTokenExpire(ZonedDateTime.now().minusMinutes(10));

        when(mockDAO.getUserByEmail(any())).thenReturn(stubDbUser);

        Optional<TdpUser> result = authenticator.authenticate(new BasicCredentials("", "token"));

        assertEquals(result.isPresent(), false);
        verify(mockDAO, times(1)).getUserByEmail(any());
    }
}
