package DAO;

import com.google.inject.Inject;
import domain.TdpIInvestment;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;
import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class TdpIInvestmentDAO extends AbstractDAO<TdpIInvestment> {
    @Inject
    public TdpIInvestmentDAO(SessionFactory sessionFactory) { super(sessionFactory); }

    public TdpIInvestment findById(Long id) { return get(id); }

    //TODO: am I supposed to perform more get requests than use select * from invest where id in(...)?
    public List<TdpIInvestment> fetchByIds(List<Long> ids) {
        return ids.stream().map(id -> get(id)).collect(Collectors.toCollection(ArrayList::new));
    }

    public long create(TdpIInvestment investment) { return persist(investment).getId(); }

    public List<TdpIInvestment> findAll() { return list(namedQuery("TdpIInvestment.findAll")); }

    public List<TdpIInvestment> findBetween(Date startDate, Date endDate) {
        return list(namedQuery("TdpIInvestment.findBetween").setDate("startDate", startDate));//.setDate("endDate", endDate));
    }

}
