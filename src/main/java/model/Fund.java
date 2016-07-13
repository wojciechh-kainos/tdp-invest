package model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;
import org.joda.time.DateTime;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Fund implements Serializable {
    private final DateTime date;
    private final double value;

    @JsonCreator
    public Fund(@JsonProperty("date") DateTime date, @JsonProperty("value") double value){
        this.date = date;
        this.value = value;
    }

    @NotEmpty
    @JsonProperty("date")
     public DateTime getDate() {
        return date;
    }

    @NotEmpty
    @JsonProperty("value")
    public double getValue() {
        return value;
    }

    @Override
    public String toString(){
        return this.date + " " + this.value;
    }
}
