package resources;

import dao.TdpUnitDAO;
import domain.TdpUnit;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TdpInvestUnitResourceTest {

    @Mock
    TdpUnitDAO mockDAO;

    TdpInvestUnitResource resource;

    private static List<TdpUnit> stubDB;

    @BeforeClass
    public static void setUpStub() {
        stubDB = new ArrayList<>();
        stubDB.add(new TdpUnit(1L, new Date(981068400000L), 95.6));
        stubDB.add(new TdpUnit(2L, new Date(981327600000L), 94.31));
        stubDB.add(new TdpUnit(3L, new Date(981414000000L), 94.34));
        stubDB.add(new TdpUnit(4L, new Date(981500400000L), 92.9));
        stubDB.add(new TdpUnit(5L, new Date(981586800000L), 93.06));
    }

    @Before
    public void setUp() {
        resource = new TdpInvestUnitResource(mockDAO);
    }

    @Test
    public void testFetchAll() {
        when(mockDAO.findAll()).thenReturn(stubDB);

        List<TdpUnit> results = resource.fetchAll();

        assertEquals(stubDB.size(), results.size());
        verify(mockDAO, times(1)).findAll();
    }

    @Test
    public void testFetch() {
        when(mockDAO.findById(1L)).thenReturn(stubDB.get(0));

        assertEquals(stubDB.get(0).getValue(), resource.fetchOne(1L).getValue());
        verify(mockDAO, times(1)).findById(anyLong());
    }

    @Test
    public void testSelectDates() {
        when(mockDAO.findAll()).thenReturn(stubDB);

        List<TdpUnit> results = resource.fetchAll();

        Date startDate = stubDB.get(0).getDate();
        Date endDate = stubDB.get(4).getDate();

        assertEquals(startDate, results.get(0).getDate());
        assertEquals(endDate, results.get(4).getDate());

        String startDateString = new SimpleDateFormat("yyyy-MM-dd").format(startDate);
        String endDateString = new SimpleDateFormat("yyyy-MM-dd").format(endDate);

        assertEquals(Response.Status.OK, resource.select(1L, startDateString, endDateString).getStatusInfo());
        assertEquals(Response.Status.BAD_REQUEST, resource.select(1L, endDateString, startDateString).getStatusInfo());
        assertEquals(Response.Status.BAD_REQUEST, resource.select(1L, "xx12", "2000-01-01").getStatusInfo());
        assertEquals(Response.Status.OK, resource.select(2L, null, null).getStatusInfo());
        assertEquals(Response.Status.BAD_REQUEST, resource.select(null, null, null).getStatusInfo());

        assertEquals(stubDB.size(), results.size());
        verify(mockDAO, times(1)).findAll();

    }
}
