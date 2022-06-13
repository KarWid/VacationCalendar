#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["VacationCalendar.Api/VacationCalendar.Api.csproj", "VacationCalendar.Api/"]
COPY ["VacationCalendar.BusinessLogic/VacationCalendar.BusinessLogic.csproj", "VacationCalendar.BusinessLogic/"]
COPY ["VacationCalendar.Repository/VacationCalendar.Repository.csproj", "VacationCalendar.Repository/"]
COPY ["VacationCalendar.Repository.EF/VacationCalendar.Repository.EF.csproj", "VacationCalendar.Repository.EF/"]
RUN dotnet restore "VacationCalendar.Api/VacationCalendar.Api.csproj"
COPY . .
WORKDIR "/src/VacationCalendar.Api"
RUN dotnet build "VacationCalendar.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "VacationCalendar.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VacationCalendar.Api.dll"]