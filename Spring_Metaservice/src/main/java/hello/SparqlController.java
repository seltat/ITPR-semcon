package hello;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class SparqlController {

    private static final String template = "{\"results\":[]}";
    private final AtomicLong counter = new AtomicLong();

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/sparql", produces = "application/json")
    public String query(@RequestParam(value="query", defaultValue="Select ?a ?b ? where {?a ?b ?c}") String query, @RequestParam(value="endpoint", defaultValue="http://localhost:4040/rdf/sparql") String endpoint) {
        SparqlQueryForwarder q = new SparqlQueryForwarder(query,endpoint);
        return q.query();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/active", produces = "application/json")
    public String getStatus(@RequestParam(value="endpoint", defaultValue="http://localhost:4040") String endpoint) {
        SparqlQueryForwarder q = new SparqlQueryForwarder("",endpoint);
        return q.getStatus();
    }
}
