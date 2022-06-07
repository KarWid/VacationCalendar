using FluentValidation;
using Microsoft.EntityFrameworkCore;
using VacationCalendar.BusinessLogic.Constants;
using VacationCalendar.BusinessLogic.Helpers;
using VacationCalendar.BusinessLogic.Managers;
using VacationCalendar.Repository;
using VacationCalendar.Repository.EF;
using VacationCalendar.Api.Middleware;
using VacationCalendar.Api.Helpers;
using VacationCalendar.Api.Requests.VacationPeriod;
using VacationCalendar.Api.Validators.VacationPeriod;
using VacationCalendar.BusinessLogic.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(corsOptions =>
{
    corsOptions.AddPolicy("AllowOrigin", corsPolicyBuilder =>
    {
        corsPolicyBuilder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddDbContextPool<AppDbContext>(options => options.UseNpgsql(Environment.GetEnvironmentVariable(Constant.EnvironmentVariable.DATABASE_CONNECTION_STRING)));
builder.Services.AddHealthChecks().AddDbContextCheck<AppDbContext>();

builder.Services.AddVacationCalendarServicesApi();
builder.Services.AddVacationCalendarServicesBusinessLogic();

builder.Services.AddScoped<IRepository, Repository>();
builder.Services.AddScoped<ITimeService, TimeService>();

// Validators
builder.Services.AddScoped<IValidator<CreateVacationPeriodRequest>, CreateVacationPeriodRequestValidator>();
builder.Services.AddScoped<IValidator<GetVacationPeriodsByDatesRequest>, GetVacationPeriodsByDatesRequestValidator>();

// Managers
builder.Services.AddScoped<IVacationPeriodManager, VacationPeriodManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowOrigin");

app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseEndpoints(endpoints => 
{ 
    endpoints.MapControllers();
    endpoints.MapHealthChecks("/HealthCheck");
});

app.MigrateDatabase<AppDbContext>();
app.Run();
