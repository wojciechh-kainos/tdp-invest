package model;

import java.time.LocalDate;

public class InvestScore {

    public LocalDate date;
    public int value;

    public InvestScore(LocalDate date, int value) {
        this.date = date;
        this.value = value;
    }
}
