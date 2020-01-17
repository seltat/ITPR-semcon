package hello;

import hello.http.ConnectionHelper;
import hello.http.FullResponseBuilder;
import hello.http.ParameterStringBuilder;

import java.io.Console;
import java.io.DataOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SparqlQueryForwarder {
    private final String query;
    private final String endpoint;

    public SparqlQueryForwarder(String query, String endpoint) {
        this.query = query;
        this.endpoint = endpoint;

        System.out.println("Query: " + query);
        System.out.println("Endpoint: " + endpoint);
        System.out.println();
    }

    public String query() {

        try {
            URL url = new URL(endpoint + "?");
            ConnectionHelper c = new ConnectionHelper(url);
            String q = "query="+ encodeValue(query);
            String[] params = new String[] {q};
            List<String> res = c.get(params);
            return res.stream().reduce("", String::concat);
        }
        catch (Exception e) {
            return e.getMessage();
        }
    }

    public String getStatus() {

        try {
            URL url = new URL(endpoint + "/api/active");
            ConnectionHelper c = new ConnectionHelper(url);
            List<String> res = c.get();
            return res.stream().reduce("", String::concat);
        }
        catch (Exception e) {
            return e.getMessage();
        }
    }

    private static String encodeValue(String value) {
        try {
            return URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException ex) {
            throw new RuntimeException(ex.getCause());
        }
    }
}
