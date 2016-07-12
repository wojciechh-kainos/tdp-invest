package service;
        import java.math.BigDecimal;
        import java.math.RoundingMode;
        import java.sql.Date;
        import java.text.ParseException;
        import java.text.SimpleDateFormat;

        import org.apache.log4j.LogManager;
        import org.apache.log4j.Logger;

public class DateTransformer {

    private static final Logger logger = LogManager.getLogger(DateTransformer.class);

    private static final String dateFormat = "dd/MM/yyyy";
    private static final String dateFromHtmlFormat = "yyyy-MM-dd";

    private Date transformDate(String dateAsString, String dateFormat) {
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        java.util.Date date = null;
        try {
            date = sdf.parse(dateAsString);
        } catch (ParseException e) {
            logger.error("The date cannot be parsed. Check your string format. [Should be: " + dateFormat + "]", e);
        }
        java.sql.Date sqlDate = new Date(date.getTime());
        return sqlDate;
    }

    public Date getDate(String dateAsString) {
        return transformDate(dateAsString, dateFormat);
    }

    public Date getDateFromHtml(String dateAsString) {
        return transformDate(dateAsString, dateFromHtmlFormat);
    }
}