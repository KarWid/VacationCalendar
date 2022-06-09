export class VacationPeriodDto {
    constructor(
        public Id: string,
        public UserId: string,
        public FirstName: string,
        public LastName: string, 
        public Notes: string,
        public From: Date,
        public To: Date
    ){}
}
