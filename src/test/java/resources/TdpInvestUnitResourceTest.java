package resources;

import DAO.TdpIUnitDAO;
import domain.TdpIDateRange;
import domain.TdpIUnit;
import org.apache.commons.io.IOUtils;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import services.TdpInvestLoadDataService;

import javax.ws.rs.core.Response;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestUnitResourceTest{

	@Mock
	TdpIUnitDAO mockUnitDAO;

	@Mock
	TdpInvestLoadDataService mockLoadDataService;

	TdpInvestUnitResource resource;

	private static List<TdpIUnit> stubDB;
	private static SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

	@BeforeClass
	public static void setUpStub() throws ParseException {
		stubDB = new ArrayList<>();
		stubDB.add(new TdpIUnit(1L, dateFormat.parse("10/02/2010"), 222.2));
		stubDB.add(new TdpIUnit(2L, dateFormat.parse("13/10/2011"), 232.2));
		stubDB.add(new TdpIUnit(3L, dateFormat.parse("20/10/2011"), 252.2));
		stubDB.add(new TdpIUnit(4L, dateFormat.parse("12/09/2012"), 272.2));
	}

	@Before
	public void setUp() {
		resource = new TdpInvestUnitResource(mockUnitDAO, mockLoadDataService);
	}

	@Test
	public void testFetchAll() {
		when(mockUnitDAO.findAll()).thenReturn(stubDB);

		List<TdpIUnit> results = resource.fetchAll();

		assertEquals(stubDB.size(), results.size());
		verify(mockUnitDAO, times(1)).findAll();
	}

	@Test
	public void testFetch() {
		when(mockUnitDAO.findById(1L)).thenReturn(stubDB.get(0));

		assertEquals(stubDB.get(0).getValue(), resource.fetch(1L).getValue());
		verify(mockUnitDAO, times(1)).findById(anyLong());
	}

	@Test
	public void testFetchAllWithinRange() throws ParseException {
		TdpIDateRange dateRange = new TdpIDateRange(dateFormat.parse("13/10/2010"), dateFormat.parse("13/11/2011"));

		when(mockUnitDAO.findAllWithinRange(dateRange)).thenReturn(stubDB.subList(1,2));

		assertEquals(stubDB.subList(1,2), resource.fetchAllWithinRange(dateRange));
		verify(mockUnitDAO, times(1)).findAllWithinRange(dateRange);
	}

	@Test
	public void testClearDB() {
		when(mockUnitDAO.deleteAll()).thenReturn(4);

		assertEquals(Response.Status.CREATED.getStatusCode(), resource.clearDB().getStatus());
		verify(mockUnitDAO, times(1)).deleteAll();
	}

	@Test
	public void testReadFile() {
		doNothing().when(mockLoadDataService).loadFromLocalFile();

		assertEquals(Response.Status.CREATED.getStatusCode(), resource.readFile().getStatus());
		verify(mockLoadDataService, times(1)).loadFromLocalFile();
	}

	@Test
	public void testUploadFile() {
		InputStream stubInputStream = IOUtils.toInputStream("VALID CSV FILE");
		doNothing().when(mockLoadDataService).loadFromUploadedFile(stubInputStream);

		assertEquals(Response.Status.CREATED.getStatusCode(), resource.uploadFile(stubInputStream, null).getStatus());
		verify(mockLoadDataService, times(1)).loadFromUploadedFile(stubInputStream);
	}
}
