1. From root directory where the docker-compose.yml is defined, run command below:
docker compose -f docker-compose.yml -f docker-compose.override.yml -p vacation-calendar --profile backend --profile frontend up -d

It will create:
- an image of API application
- postgres image - database
- an image of Angular application

To verify the result:
- hit the url: https://localhost:4015/healthcheck to check if the API and the database connection works
- hit the url: http://localhost:4014 to run the web application