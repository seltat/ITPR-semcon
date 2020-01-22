# Introduction

This is the React Frontend Page for the DepartureDelays semantic container project. To run this project locally, you need to have [node.js](nodejs.org) installed.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**





# Useful commands for Docker

## save container

docker commit my_conainer repo/my_image

## export to file

docker save repo/my_image | gzip > my_image.tgz

## importing a container file

docker load < {filename} 

## starting the semantic container

docker run -p 4000:3000 -p 4040:3030  -d --name semcon-franz plane-sparql-16490-entries

## deleting the container

docker rm -f semcon-franz

# changing mappings of semantic container after importing data

- docker exec -t -i semcon-franz /bin/bash
- sed 's/{text-zu-ersetzen}/{neuer-text}/' config/mapping.ttl > config/mapping.ttl.changed && mv mapping.ttl.changed mapping.ttl
- . script/init.sh

# FIXING CORS - Attempts

## option 1 - USE METASERVICE
metaservice is included in this repo.

## option 2 (DEV only)
disable CORS security in browser settings.
https://stackoverflow.com/questions/4556429/disabling-same-origin-policy-in-safari

## option 3 - work in progress
allow all origins in rails in container

steps:

- enter container: docker exec -t -i semcon-franz /bin/bash
- cd /usr/src/app/app/controllers/api/v1
- ????

Einfügen in Zeile 5
sed -i '5i{Text}\n' sparqls_controller.rb

Löschen :
    sed -i '/{Löschtext}/d' sparqls_controller.rb

RUBY für Access Control:

before_filter :set_headers 
private

  def set_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Expose-Headers'] = 'ETag'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
    headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match'
    headers['Access-Control-Max-Age'] = '86400'
  end



links:
https://medium.com/@admatbandara/setting-up-cors-to-my-rails-api-a6184e461a0f

