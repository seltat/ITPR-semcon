package hello;

public class SparqlResult {
    private final String query;
    private final String result;


    public SparqlResult(String query, String result) {
        this.query = query;
        this.result = result;
    }

    public String getQuery() {
        return query;
    }

    public String getResult() {
        return result;
    }
}
