package auth;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestPasswordStoreTest {

    TdpInvestPasswordStore passwordStore;

    @Before
    public void setUp() {
        passwordStore = new TdpInvestPasswordStore();
    }

    @Test
    public void testHashingWithSalts() throws TdpInvestPasswordStore.CannotPerformOperationException {
        char[] password = "password".toCharArray();

        String hash1 = TdpInvestPasswordStore.createHash(password);
        String hash2 = TdpInvestPasswordStore.createHash(password);

        // hashing should yield different results for the same password due to using salts
        assertNotEquals(hash1, hash2);
    }

    @Test
    public void testComparingPasswordWithHash() throws TdpInvestPasswordStore.InvalidHashException, TdpInvestPasswordStore.CannotPerformOperationException {
        char[] correctPassword = "correct password".toCharArray();
        char[] badPassword = "bad password".toCharArray();

        String hash = TdpInvestPasswordStore.createHash(correctPassword);

        assertTrue(TdpInvestPasswordStore.verifyPassword(correctPassword, hash));
        assertFalse(TdpInvestPasswordStore.verifyPassword(badPassword, hash));
    }

}
