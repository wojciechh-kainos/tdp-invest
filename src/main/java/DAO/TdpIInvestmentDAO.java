package DAO;

import com.google.inject.Inject;
import domain.TdpIInvestment;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TdpIInvestmentDAO extends AbstractDAO<TdpIInvestment> {
    @Inject
    public TdpIInvestmentDAO(SessionFactory sessionFactory) { super(sessionFactory); }

    public TdpIInvestment findById(Long id) { return get(id); }

    public long create(TdpIInvestment investment) { return persist(investment).getId(); }

    public void removeById(Long id){
        currentSession().delete(findById(id));
    }

    public void edit(TdpIInvestment investment) {
        currentSession().merge(investment);
    }

    public List<TdpIInvestment> findAll() { return list(namedQuery("TdpIInvestment.findAll")); }

    public List<TdpIInvestment> findBetween(Date startDate, Date endDate){
        Criteria criteria = currentSession().createCriteria(TdpIInvestment.class);
        addRestrictionIfNotNull(criteria, Restrictions.ge("startDate", startDate), startDate);
        addRestrictionIfNotNull(criteria, Restrictions.le("endDate", endDate), endDate);

        return criteria.list();
    }

    private void addRestrictionIfNotNull(Criteria criteria, Criterion expression, Object value){
        if (value != null){
            criteria.add(expression);
        }
    }
}
