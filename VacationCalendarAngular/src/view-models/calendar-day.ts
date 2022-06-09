export class CalendarDay {
    public date: Date;
    public title: string;
    public isPastDate: boolean;
    public isToday: boolean;

    constructor(date: Date, title: string = ""){
        this.date = date;
        this.title = title;

        let today = new Date().setHours(0,0,0,0);
        this.isPastDate = date.setHours(0,0,0,0) < today;
        this.isToday = date.setHours(0,0,0,0) == today;
    }
}
