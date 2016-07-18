package resources;

import dao.TdpFundDAO;
import dao.TdpUnitDAO;
import domain.TdpFund;
import domain.TdpUser;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestFundResourceTest {

	@Mock
	TdpFundDAO mockFundDAO;

	@Mock
	TdpUnitDAO mockUnitDAO;

	TdpInvestFundResource resource;

	private static List<TdpFund> stubDB;

	private static TdpUser stubUser;

	@BeforeClass
	public static void setUpStub() {
		stubDB = new ArrayList<>();
		stubDB.add(new TdpFund(1L, "Test", "TST"));
		stubDB.add(new TdpFund(2L, "Test2", "TST2"));
		stubDB.add(new TdpFund(3L, "Test3", "TST3"));
		stubDB.add(new TdpFund(4L, "Test4", "TST4"));

		stubUser = new TdpUser("a@test", "a");
	}

	@Before
	public void setUp() {
		resource = new TdpInvestFundResource(mockFundDAO, mockUnitDAO);
	}

	@Test
	public void testFetchAll() {
		when(mockFundDAO.findAll()).thenReturn(stubDB);

		List<TdpFund> results = resource.fetchAll();

		assertEquals(stubDB.size(), results.size());
		verify(mockFundDAO, times(1)).findAll();
	}

	@Test
	public void testFetch() {
		when(mockFundDAO.findById(1L)).thenReturn(stubDB.get(0));

		assertEquals(stubDB.get(0).getName(), resource.fetch(1L).getName());
		verify(mockFundDAO, times(1)).findById(anyLong());
	}
}
