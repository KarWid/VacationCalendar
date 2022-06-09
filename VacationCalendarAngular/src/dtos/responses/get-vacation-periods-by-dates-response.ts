import { VacationPeriodDto } from "../vacation-period-dto";

export class GetVacationPeriodsByDatesResponse {
    constructor(
        public vacationPeriods: VacationPeriodDto[]
    ){}
}
