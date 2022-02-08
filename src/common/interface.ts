import {HttpStatus} from '@nestjs/common';
import {ErrorMessage, ResponseMessage} from "./constant";

export class ResponseReport {
    code: number;
    message: string;
    data: any;

    constructor(fields?: Partial<ResponseReport>) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
}

export class ResponseSuccess extends ResponseReport {
    code = HttpStatus.OK;
    message = ResponseMessage.SUCCESS_0;
    data: any;
}

export class ResponseError extends ResponseReport {
    code = HttpStatus.BAD_REQUEST;
    message: ErrorMessage.EMPLOYEE_NOT_FOUND;
    data: any;
}

export class ErrorHandle extends Error {
    code: number;
    message: string;
    data: any;

    constructor(fields?: Partial<ErrorHandle>) {
        super();
        if (fields) {
            Object.assign(this, fields);
        }
    }
}

