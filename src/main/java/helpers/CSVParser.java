package helpers;

import org.json.JSONArray;
import org.json.JSONException;

public final class CSVParser {

    public static String CSVtoJSON(String CSV) throws JSONException {

        int x,y;
        JSONArray point;
        JSONArray output = new JSONArray();

        String[] lines = CSV.split("\n");
        for(int i=0; i<lines.length; i++) {
            x = Integer.parseInt(lines[i].split(",")[0]);
            y = Integer.parseInt(lines[i].split(",")[1]);
            point = new JSONArray();
            point.put(x);
            point.put(y);
            output.put(point);
        }

        return output.toString();
    }

}
