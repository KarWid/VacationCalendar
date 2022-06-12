import { VacationPeriodDto } from "src/app/dtos/vacation-period-dto";

export class CalendarDay {
    public date: Date;
    public title: string;
    public isPastDate: boolean;
    public isToday: boolean;
    public hasVacation: boolean;
    public vacationPeriods: Array<VacationPeriodDto>

    constructor(date: Date, vacationPeriods: Array<VacationPeriodDto>, title: string = ""){
        this.date = date;
        this.title = title;
        this.vacationPeriods = vacationPeriods; 
        this.hasVacation = vacationPeriods.length > 0;

        let today = new Date().setHours(0,0,0,0);
        this.isPastDate = date.setHours(0,0,0,0) < today;
        this.isToday = date.setHours(0,0,0,0) == today;
    }

    public getUsersInitials():Array<string>{
        var result = new Array<string>();

        if (this.vacationPeriods.length === 0){
            return result;
        }

        this.vacationPeriods.forEach(vacationPeriod => {
            result.push(`${vacationPeriod.firstName[0]}${vacationPeriod.lastName[0]}`);
        });

        return result;
    }
}
