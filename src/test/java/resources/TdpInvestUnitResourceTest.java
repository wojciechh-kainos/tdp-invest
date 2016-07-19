package resources;

import dao.TdpIUnitDAO;
import domain.TdpIUnit;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestUnitResourceTest{

	@Mock
	TdpIUnitDAO mockDAO;

	TdpInvestUnitResource resource;

	private static List<TdpIUnit> stubDB;

	@BeforeClass
	public static void setUpStub() {
		stubDB = new ArrayList<>();
		stubDB.add(new TdpIUnit(1L, LocalDate.now(), 222.2));
		stubDB.add(new TdpIUnit(2L, LocalDate.now(), 232.2));
		stubDB.add(new TdpIUnit(3L, LocalDate.now(), 252.2));
		stubDB.add(new TdpIUnit(4L, LocalDate.now(), 272.2));
	}

	@Before
	public void setUp() {
		resource = new TdpInvestUnitResource(mockDAO);
	}

	@Test
	public void testFetchAll() {
		when(mockDAO.findAll()).thenReturn(stubDB);

		List<TdpIUnit> results = resource.fetchAll();

		assertEquals(stubDB.size(), results.size());
		verify(mockDAO, times(1)).findAll();
	}

	@Test
	public void testFetch() {
		when(mockDAO.findById(1L)).thenReturn(stubDB.get(0));

		assertEquals(stubDB.get(0).getValue(), resource.fetch(1L).getValue());
		verify(mockDAO, times(1)).findById(anyLong());
	}
}
