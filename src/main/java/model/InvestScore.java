package model;

import java.time.LocalDate;
import java.util.Objects;

public class InvestScore {

    public LocalDate date;
    public int value;

    public InvestScore(LocalDate date, int value) {
        this.date = date;
        this.value = value;
    }

    @Override public boolean equals(Object investScoreToCompare) {
        InvestScore investScore = (InvestScore)investScoreToCompare;
        if(this.date.isEqual(investScore.date) &&
                this.value == investScore.value)
            return true;
        return false;
    }

}
