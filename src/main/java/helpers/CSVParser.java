package helpers;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.*;


public final class CSVParser {
    public static String CSVtoJSON(InputStream input) throws JSONException, IOException {
        long x;
        double y;
        JSONArray point;
        JSONArray output = new JSONArray();
        String line;
        BufferedReader br = new BufferedReader(new InputStreamReader(input));
        while((line = br.readLine()) != null){
            x = Long.parseLong(line.split("[,;]")[0]);
            y = Double.parseDouble(line.split("[,;]")[1]);
            point = new JSONArray();
            point.put(x);
            point.put(y);
            output.put(point);
        }
        return output.toString();
    }
}