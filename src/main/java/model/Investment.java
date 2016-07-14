package model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;

import java.io.Serializable;

public class Investment implements Serializable {
    private final double amount;
    private final double annualRate;

    @JsonCreator
    public Investment(@JsonProperty("amount")double amount, @JsonProperty("annualRate")double annualRate){
        this.amount = amount;
        this.annualRate = annualRate;
    }

    @NotEmpty
    @JsonProperty("amount")
    public double getAmount(){
        return this.amount;
    }

    @NotEmpty
    @JsonProperty("annualRate")
    public double getAnnualRate(){
        return this.annualRate;
    }

    @Override
    public String toString(){
        return "$" + this.amount + ", " + this.annualRate * 100 + "%";
    }
}
