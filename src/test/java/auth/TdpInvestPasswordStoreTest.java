package auth;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestPasswordStoreTest {

    private TdpInvestPasswordStore passwordStore;

    @Before
    public void setUp() {
        passwordStore = new TdpInvestPasswordStore();
    }

    @Test
    public void testHashingWithSalts() throws TdpInvestPasswordStore.CannotPerformOperationException {
        char[] password = "password".toCharArray();

        String hash1 = passwordStore.createHash(password);
        String hash2 = passwordStore.createHash(password);

        // hashing should yield different results for the same password due to using salts
        assertNotEquals(hash1, hash2);
    }

    @Test
    public void testComparingPasswordWithHash() throws TdpInvestPasswordStore.InvalidHashException, TdpInvestPasswordStore.CannotPerformOperationException {
        char[] correctPassword = "correct password".toCharArray();
        char[] badPassword = "bad password".toCharArray();

        String hash = passwordStore.createHash(correctPassword);

        assertTrue(passwordStore.verifyPassword(correctPassword, hash));
        assertFalse(passwordStore.verifyPassword(badPassword, hash));
    }

}
