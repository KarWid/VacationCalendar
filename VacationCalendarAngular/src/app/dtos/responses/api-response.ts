export class ApiResponse<T = any> {
    public success: boolean;
    public status: ApiResponseStatus;
    public errors: Array<string>;
    public result: T;

    constructor(obj: any){
        if(!obj || obj.Status === undefined ){
            // TODO: throw front exception ?
            this.success = false;
            this.status = ApiResponseStatus.Undefined;
            this.errors = new Array<string>();
            this.result = {} as T;
            return;
        }

        this.success = obj.Success;
        this.status = obj.Status;
        this.errors = obj.Errors;
        this.result = obj.Result;
    }
}

export enum ApiResponseStatus{
    Undefined = -1,
    Success = 0,
    NotFound = 1,
    DatabaseError = 2,
    BusinessLogicError = 3,
    InvalidQuery = 4,
    Validation = 5,
}