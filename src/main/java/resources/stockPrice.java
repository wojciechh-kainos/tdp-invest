package resources;

import java.util.Date;

/**
 * Created by jakubr on 11/07/16.
 * Klasa przetrzymująca nasz format danych - następnie z obiektów będziemy robić listę do wysłania do javascripta
 */
public class StockPrice {
    public String date;
    public Float price;

    StockPrice(String d, Float p){
        date = d;
        price = p;
    }
}