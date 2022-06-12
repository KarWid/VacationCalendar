1. From root directory where the docker-compose.yml is defined, run command below:
docker compose -f docker-compose.yml -f docker-compose.override.yml -p vacation-calendar-container up -d

It will create an image of API application and postgres image to store data.

2. Open folder VacationCalendarAngular in Visual Studio Code.
3. Frontend is written in Angular 14. Just run "ng serve".
a) API url is not defined yet in the config file, is defined in the app.service.ts as https://localhost:4015/api.