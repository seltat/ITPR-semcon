# Tutorial for using Sparql Semantic Containers with DDR2-data

## Basics

DDR2-Daten are provided in the exp2 data format. exp2 files contain comma separated text with 95 *columns* or data fields per flight. This data needs to be converted into a JSON file. As 95 values are probably more than required for most applications, we recommend converting only those attributes that are actually needed, because files become quite large anyways.

To find out what attributes are relevant for your application, please refer to the following guide: 

DDR2 Reference Manual For
General Users
2.9.5

Another MD-File containing most of the information will soon be linked.

### Parsing application

For parsing exp2-Data into JSON format, we created a JavaFX application that allows users to select desired attributes using checkboxes. It can be obtained from the following Github repository.

**[EXP-Parser](https://github.com/Birnbaua/EXP2-Parser.git)**

## Preparations

In order to use the Sparql Endpoint of Semantic Containers, we first need to create a RML mappimg for our JSON data. The RML is a mapping that enables the container to transform the JSON data into RDF triples.

To learn more about RDF and RML, please refer to the [official guide.](http://rml.io)

### Example Mapping

The following example illustrates an examplary mapping of JSON data via RML.

```json
[{
   "origin": "LFRQ",
   "origin_uri": "http://dbpedia.org/resource/Quimper–Cornouaille_Airport",
   "destination": "LFMN",
   "destination_uri": "http://dbpedia.org/resource/Nice_Côte_d'Azur_Airport",
   "flight_id": 230534847,
   "date_departure": "2019-06-01",
   "time_departure": "11:11",
   "company": "HOP",
   "planned_date_departure": "2019-06-01",
   "planned_time_departure": "11:05",
   "departureDelay": 6
},
{
   "origin": "EKCH",
   "origin_uri": "http://dbpedia.org/resource/Copenhagen_Airport",
   "destination": "LGSA",
   "destination_uri": "http://dbpedia.org/resource/Chania_International_Airport",
   "flight_id": 230538941,
   "date_departure": "2019-06-01",
   "time_departure": "13:42",
   "company": "IBK",
   "planned_date_departure": "2019-06-01",
   "planned_time_departure": "13:32",
   "departureDelay": 10
},
[...]
]
```

```rml
@prefix rr:     <http://www.w3.org/ns/r2rml#> .
@prefix rml:    <http://semweb.mmlab.be/ns/rml#> .
@prefix ql:     <http://semweb.mmlab.be/ns/ql#> .
@prefix carml:  <http://carml.taxonic.com/carml/> .
@prefix dcterm: <http://purl.org/dc/terms/> .
@prefix func:   <http://semantics.id/ns/function#> .
@prefix param:  <http://semantics.id/ns/parameter#> .
@prefix fnml:   <http://semweb.mmlab.be/ns/fnml#> .
@prefix fno:    <http://semweb.datasciencelab.be/ns/function#> .
@prefix dbo:    <http://dbpedia.org/ontology/> .

<#FlightsMapping>
        rml:logicalSource [
            rml:source [
                a carml:Stream;
            ];
            rml:referenceFormulation ql:JSONPath;
            rml:iterator "$.provision.content.[*]" ;
        ];

        rr:subjectMap [
            rr:template "http://www.jku.at/dke/semcon/departuredelays/flight#{flight_id}" ;
        ];

        rr:predicateObjectMap [
            rr:predicate rdf:type;
            rr:objectMap [ rr:template "http://www.jku.at/dke/semcon/departuredelays#flight" ];
        ];

        rr:predicateObjectMap [
            rr:predicate dd:hasOrigin;
            rr:objectMap [
                rml:reference "origin" ;
                rr:datatype dd:Airport ;
            ];
        ];

        rr:predicateObjectMap [
            rr:predicate dd:hasDestination;
            rr:objectMap [
                rml:reference "destination" ;
                rr:datatype dd:Airport ;
            ];
        ];

         rr:predicateObjectMap [
            rr:predicate dd:isPerformedByCompany;
            rr:objectMap [
                rml:reference "company" ;
                rr:datatype dd:Company ;
            ];
        ];

         rr:predicateObjectMap [
            rr:predicate dd:hasDeparture;
            rr:objectMap [
                carml:multiTemplate "{date_departure}T{time_departure}:00" ;
                rr:datatype xsd:dateTime ;
            ];
        ];


         rr:predicateObjectMap [
            rr:predicate dd:hasPlannedDeparture;
            rr:objectMap [
                carml:multiTemplate "{planned_date_departure}T{planned_time_departure}:00" ;
                rr:datatype xsd:dateTime ;
            ];
        ];

        rr:predicateObjectMap [
            rr:predicate dd:hasDepartureDelay;
            rr:objectMap [
                rml:reference "departureDelay" ;
                rr:datatype xsd:decimal ;
            ];
        ];

    .


    <#AirportsMapping1>
        rml:logicalSource [
            rml:source [
                a carml:Stream;
            ];
            rml:referenceFormulation ql:JSONPath;
            rml:iterator "$.provision.content.[*]" ;
        ];



        rr:subjectMap [
            rr:template "http://www.jku.at/dke/semcon/departuredelays/Airport#{origin}" ;
        ];
        rr:predicateObjectMap [
            rr:predicate rdf:type;
            rr:objectMap [ rr:template "http://www.jku.at/dke/semcon/departuredelays#Airport" ];
        ];
        rr:predicateObjectMap [
            rr:predicate dd:hasDBPediaEntry;
            rr:objectMap [
                rml:reference "origin_uri" ;
                rr:datatype rr:IRI ;
            ];
        ];
    .

    <#AirportsMapping2>
        rml:logicalSource [
            rml:source [
                a carml:Stream;
            ];
            rml:referenceFormulation ql:JSONPath;
            rml:iterator "$.provision.content.[*]" ;
        ];
        
        rr:subjectMap [
            rr:template "http://www.jku.at/dke/semcon/departuredelays/Airport#{destination}" ;
        ];
        
        rr:predicateObjectMap [
            rr:predicate rdf:type;
            rr:objectMap [ rr:template "http://www.jku.at/dke/semcon/departuredelays#Airport" ];
        ];
        
        rr:predicateObjectMap [
            rr:predicate dd:hasDBPediaEntry;
            rr:objectMap [
                rml:reference "destination_uri" ;
                rr:datatype rr:IRI ;
            ];
        ];
    .
```

## Starting the semantic container

A complete guide on how to start the semantic container can be found in the [official git repository](https://github.com/sem-con/Tutorials/tree/master/4_SPARQL) of semantic containers.

A few points worth noting:
In order for the semantic container to start up, the RML mapping needs to be included into the ```:DataMapping{}``` section of a .trig file. A template can be found [here](https://github.com/sem-con/Tutorials/blob/master/4_SPARQL/init_seismic.trig).
If there are errors in the RML mapping, the semantic container might crash on startup or might display errors when trying to access the Sparql endpoint.

The following commands can also be found in the original tutorial for Sparql Semantic Containers.

Check if the container is running by visiting ```http://{IP_OF_CONTAINER}:{LOCAL_DATA_PORT}/api/active```

### Pull the Sparql Semantic Container image from docker hub

```console
$ docker pull semcon/sc-sparql
```  

### Starting a docker container using the .trig file created in the step before

Open a terminal window, navigate to the directory where the trig file is located.

```console
IMAGE=semcon/sc-sparql:latest; docker run -d --name {CONTAINER_NAME} -e IMAGE_SHA256="$(docker image ls --no-trunc -q $IMAGE | cut -c8-)" -e IMAGE_NAME=$IMAGE -p {LOCAL_DATA_PORT}:3000 -p {LOCAL_SPARQL_PORT}:3030 $IMAGE /bin/init.sh "$(< {FILENAME}.trig)"
```  

The placeholders can be set freely, {LOCAL_DATA_PORT} can be replaced by any local port number that is not in use on the host machine, the same is also true for {LOCAL_SPARQL_PORT}.
{FILENAME} obviously refers to the name of the .trig file.
{CONTAINER_NAME} is used to later reference the container in the console 

## Inserting Data into the Semantic Container

Inserting data into the Semantic Container is done by sending a HTTP POST request to ```http://{IP_OF_CONTAINER}:{LOCAL_DATA_PORT}/api/data``` with the JSON content as request body. For testing purposes, this can be done in [Postman](https://www.getpostman.com) by selecting Body->raw and just pasting the JSON into the text box, entering the URL, selecting POST and pressing the send button. This is an easy way to quickly modify data.

## Resetting the semantic container 

To stop and remove a running container, use the following command:

```console
docker rm -f {CONTAINER_NAME}
```

To restart the container, simply start the container again.

## Querying the container

For reading all the data from the container, a HTTP GET request should be sent to ```http://{IP_OF_CONTAINER}:{LOCAL_DATA_PORT}/api/data``` or ```http://{IP_OF_CONTAINER}:{LOCAL_DATA_PORT}/api/data```.

To perform a Sparql query, use the following Endpoint:

```http://{IP_OF_CONTAINER}:{LOCAL_SPARQL_PORT}/rdf/sparql```

Here, we need to pass the query as a GET parameter named *query*. **Attention!** It is necessary to URL-Encode all parameters.

And example request would therefore look like this:

```url
http://localhost:4040/rdf/sparql?query=SELECT%20%3Fa%20%3Fb%20%3Fc%20where%20%7B%3Fa%20%3Fb%20%3Fc.%7D
```
which sends the following generic sparql query to the server
```sparql
SELECT ?a ?b ?c where {?a ?b ?c.}
```

The response format is JSON and looks like this:

```json
{
  "head": {
    "vars": [
      "a",
      "b",
      "c"
    ]
  },
  "results": {
    "bindings": [
      {
        "a": {
          "type": "uri",
          "value": "http://www.jku.at/dke/semcon/departuredelays/Airport#LFRS"
        },
        "b": {
          "type": "uri",
          "value": "http://www.jku.at/dke/semcon/departuredelays#hasDBPediaEntry"
        },
        "c": {
          "type": "literal",
          "datatype": "http://www.w3.org/ns/r2rml#IRI",
          "value": "http://dbpedia.org/resource/Nantes_Atlantique_Airport"
        }
      },
      {
        "a": {
          "type": "uri",
          "value": "http://www.jku.at/dke/semcon/departuredelays/Airport#LFRS"
        },
        "b": {
          "type": "uri",
          "value": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
        },
        "c": {
          "type": "uri",
          "value": "http://www.jku.at/dke/semcon/departuredelays#Airport"
        }
      },
      [...]
     ]
}
```

