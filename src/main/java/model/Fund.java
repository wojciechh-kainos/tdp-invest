package model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.Date;

public class Fund {
    private final Date date;
    private final double value;

    @JsonCreator
    public Fund(@JsonProperty("date") Date date, @JsonProperty("value") double value){
        this.date = date;
        this.value = value;
    }

    @NotEmpty
    @JsonProperty("date")
     public Date getDate() {
        return date;
    }

    @NotEmpty
    @JsonProperty("value")
    public double getValue() {
        return value;
    }
}
