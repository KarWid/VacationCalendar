I. If a connectionString is null or empty, then setup the environment variable by:
$env:VACATION_CALENDAR_CONNECTION_STRING='{database connection string here}'

1. To add migration
dotnet ef migrations add {Migration-Name} --project VacationCalendar.Repository.EF --startup-project VacationCalendar.Api

2. To update database
Update-database


a) Create a postgres user: VacationCalendarUser
b) Create and name a database as: VacationCalendar and grant privilages or set the user as owner
c) Update the connectionString to the database defined in launchSettings.json and/or in environment variables
d) Create extension in the database: uuid-ossp
e) Run "Update-database"