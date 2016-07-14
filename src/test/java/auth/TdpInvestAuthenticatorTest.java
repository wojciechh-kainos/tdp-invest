package auth;

import com.google.common.base.Optional;
import dao.TdpUserDAO;
import domain.TdpUser;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.basic.BasicCredentials;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestAuthenticatorTest {

    @Mock
    TdpUserDAO mockDAO;

    TdpInvestAuthenticator authenticator;

    private static TdpUser stubDbUser;

    @BeforeClass
    public static void setUpStub() throws TdpInvestPasswordStore.CannotPerformOperationException {
        stubDbUser = new TdpUser("a@a", TdpInvestPasswordStore.createHash("pass"));
    }

    @Before
    public void setUp() { authenticator = new TdpInvestAuthenticator(mockDAO); }

    @Test
    public void testAuthenticationWithValidCredentials() throws AuthenticationException {
        when(mockDAO.getUserByEmail(any())).thenReturn(stubDbUser);

        Optional<TdpUser> result = authenticator.authenticate(new BasicCredentials("", "pass"));

        assertEquals(result.isPresent(), true);
        assertEquals(result.get(), stubDbUser);
        verify(mockDAO, times(1)).getUserByEmail(any());
    }

    @Test
    public void testAuthenticationWithInvalidCredentials() throws AuthenticationException {
        when(mockDAO.getUserByEmail(any())).thenReturn(stubDbUser);

        Optional<TdpUser> result = authenticator.authenticate(new BasicCredentials("", "wrong"));

        assertEquals(result.isPresent(), false);
        verify(mockDAO, times(1)).getUserByEmail(any());
    }

}
