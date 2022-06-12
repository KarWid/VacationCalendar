export class CreateVacationPeriodResponse {
    constructor(
        public Id : string,
        public UserId: string,
        public FirstName: string,
        public LastName: string,
        public From: Date,
        public To: Date,
        public Notes: string
    ){}
}
