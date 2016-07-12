package helpers;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.*;


public final class CSVParser {

//    public static void main(String[] args) throws FileNotFoundException, IOException, JSONException {
//        InputStream in = new FileInputStream(new File("/Users/dawidk/Desktop/Workbook1.csv"));
//        System.out.println(CSVtoJSON(in));
//    }

    public static String CSVtoJSON(InputStream input) throws JSONException, IOException {
        System.out.println("CSVtoJSON running!");
        int x,y;
        JSONArray point;
        JSONArray output = new JSONArray();
        String line;
        BufferedReader br = new BufferedReader(new InputStreamReader(input));
        while((line = br.readLine()) != null){
            x = Integer.parseInt(line.split("[,;]")[0]);
            y = Integer.parseInt(line.split("[,;]")[1]);
            point = new JSONArray();
            point.put(x);
            point.put(y);
            output.put(point);
        }
        System.out.println(output.toString());
        return output.toString();
    }

}