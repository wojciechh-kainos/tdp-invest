package resources;

import DAO.TdpIUnitDAO;
import domain.TdpIFund;
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
	TdpIUnitDAO mockDAO;

	TdpInvestFundResource resource;

	private static List<TdpIFund> stubDB;

	@BeforeClass
	public static void setUpStub() {
		stubDB = new ArrayList<>();
		stubDB.add(new TdpIFund(1L, "Test", "TST"));
		stubDB.add(new TdpIFund(2L, "Test2", "TST2"));
		stubDB.add(new TdpIFund(3L, "Test3", "TST3"));
		stubDB.add(new TdpIFund(4L, "Test4", "TST4"));
	}

	@Before
	public void setUp() {
		resource = new TdpInvestFundResource(mockDAO);
	}

	@Test
	public void testFetchAll() {
		when(mockDAO.findAll()).thenReturn(stubDB);

		List<TdpIFund> results = resource.fetchAll();

		assertEquals(stubDB.size(), results.size());
		verify(mockDAO, times(1)).findAll();
	}

	@Test
	public void testFetch() {
		when(mockDAO.findById(1L)).thenReturn(stubDB.get(0));

		assertEquals(stubDB.get(0).getName(), resource.fetch(1L).getName());
		verify(mockDAO, times(1)).findById(anyLong());
	}
}
