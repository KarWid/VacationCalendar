1. Open solution VacationCalendar.sln in Visual Studio 2022.

2. Set docker-compose as startup project and Run docker-compose via Visual Studio
a) it will create an image of API application and postgres image to store data

3. Open folder VacationCalendarAngular in Visual Studio Code.

4. Frontend is written in Angular 14. Just run "ng serve".
a) API url is not defined yet in the config file, is defined in the app.service.ts as https://localhost:4015/api.