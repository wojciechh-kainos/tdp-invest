package resources;

import dao.TdpUnitDAO;
import domain.TdpFund;
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
    private static List<TdpFund> stubDBFund;

    @BeforeClass
    public static void setUpStub() {
        stubDBFund = new ArrayList<>();
        stubDBFund.add(new TdpFund(1L, "Test", "TST"));

        stubDB = new ArrayList<>();
        stubDB.add(new TdpUnit(1L, new Date(981068400000L), 95.6, stubDBFund.get(0)));
        stubDB.add(new TdpUnit(2L, new Date(981327600000L), 94.31, stubDBFund.get(0)));
        stubDB.add(new TdpUnit(3L, new Date(981414000000L), 94.34, stubDBFund.get(0)));
        stubDB.add(new TdpUnit(4L, new Date(981500400000L), 92.9, stubDBFund.get(0)));
        stubDB.add(new TdpUnit(5L, new Date(981586800000L), 93.06, stubDBFund.get(0)));
    }

    @Before
    public void setUp() {
        resource = new TdpInvestUnitResource(mockDAO);
    }

    @Test
    public void testFetch() {
        when(mockDAO.findById(1L)).thenReturn(stubDB.get(0));

        assertEquals(stubDB.get(0).getValue(), resource.fetchOne(1L).getValue());
        verify(mockDAO, times(1)).findById(anyLong());
    }

    @Test
    public void testSelectDates() {
        when(mockDAO.selectData(1L)).thenReturn(stubDB);

        Response results = resource.select(1L, null, null);

        Date startDate = stubDB.get(0).getDate();
        Date endDate = stubDB.get(4).getDate();

        String startDateString = new SimpleDateFormat("yyyy-MM-dd").format(startDate);
        String endDateString = new SimpleDateFormat("yyyy-MM-dd").format(endDate);

        assertEquals(Response.Status.OK, resource.select(1L, startDateString, endDateString).getStatusInfo());
        assertEquals(Response.Status.BAD_REQUEST, resource.select(1L, endDateString, startDateString).getStatusInfo());
        assertEquals(Response.Status.BAD_REQUEST, resource.select(1L, "xx12", "2000-01-01").getStatusInfo());
        assertEquals(Response.Status.OK, resource.select(2L, null, null).getStatusInfo());
        assertEquals(Response.Status.BAD_REQUEST, resource.select(null, null, null).getStatusInfo());

        verify(mockDAO, times(1)).selectData(1L);

    }
}
