export class ApiResponse<T> {
    constructor(
        public success: boolean,
        public status: ApiResponseStatus,
        public errors: string[],
        public result: T
    ){}
}

export enum ApiResponseStatus{
    Success = 0,
    NotFound = 1,
    DatabaseError = 2,
    BusinessLogicError = 3,
    InvalidQuery = 4
}