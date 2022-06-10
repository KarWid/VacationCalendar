export class VacationPeriodDto {
    public id: string;
    public userId: string;
    public firstName: string;
    public lastName: string; 
    public notes: string;
    public from: Date;
    public to: Date;

    constructor(
        id: string,
        userId: string,
        firstName: string,
        lastName: string, 
        notes: string,
        from: string, // TODO: handle serialization in other way, probably globally string to dates
        to: string
    )
    {
        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.notes = notes;
        this.from = new Date(from);
        this.to = new Date(to);
    }
}
