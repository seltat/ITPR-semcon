# Spring Metaservice for Semcon

This project is a small utility that enables CORS for Semcon by Forwarding Requests and adding the header Access-Control-Allow-Origin:*

## Building the Project

#### Requirements

- [Maven]("https://maven.apache.org") installed on machine
- Java version > 1.8 installed

#### Building 

```console
./mvnw package && java -jar target/spring-metaservice.jar
```

## Creating Docker image
```console
docker build -t springio/gs-spring-boot-docker .
```

## Running a Docker container from the image

```console
docker run -p 8080:8080 -d --name metaservice_semcon  -t springio/gs-spring-boot-docker
```

## Removing the docker container

```console
docker rm -f metaservice_semcon
```

## Using the Service

The service forwards requests sent to its /sparql endpoint to a semantic container.

#### Parameters for Endpoint /sparql- GET
<table>
<thead>
<tr>
<th>
Parameter-Name
</th>
<th>
Description
</th>
</tr>
</thead>
<tbody>
<tr>
<td>query</td>
<td>Accepts a valid SPARQL query including prefixes.</td>
</tr>
<tr>
<td>
endpoint
</td>
<td>
The Endpoint where the service should redirect the query to.
This parameter must be formatted like this: http://localhost:4040/rdf/sparql
/rdf/sparql is the Sparql-Endpoint of the semantic container. It is important that the specified endpoint does not end in "/"

The default value for the Container IP and endpoint is: http://localhost:4040/rdf/sparql
</td>
</tr>
</tbody>

</table>