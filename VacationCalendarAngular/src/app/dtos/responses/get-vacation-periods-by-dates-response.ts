import { VacationPeriodDto } from "../vacation-period-dto";

export class GetVacationPeriodsByDatesResponse {
    public vacationPeriods: Array<VacationPeriodDto>
    constructor(
        vacationPeriods: Array<VacationPeriodDto>
    ){
        // map models from response to dtos - dates not mapped properly
        this.vacationPeriods = new Array<VacationPeriodDto>();

        vacationPeriods.forEach(vacationPeriod =>{
            this.vacationPeriods.push(new VacationPeriodDto(
                vacationPeriod.id,
                vacationPeriod.userId,
                vacationPeriod.firstName,
                vacationPeriod.lastName,
                vacationPeriod.notes,
                vacationPeriod.from.toString(),
                vacationPeriod.to.toString()))
            }
        );
    } 
}