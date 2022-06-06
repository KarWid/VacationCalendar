using Microsoft.EntityFrameworkCore;
using VacationCalendar.Api.Middleware;
using VacationCalendar.Repository;
using VacationCalendar.Repository.EF;
using VacationCalendar.Api.Constants;
using VacationCalendar.BusinessLogic.Managers;

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

builder.Services.AddScoped<IRepository, Repository>();
builder.Services.AddScoped<VacationPeriodManager, VacationPeriodManager>();

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

app.Run();
