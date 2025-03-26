import { StatusCodes } from "http-status-codes";

export interface ErrorDefinition {
    statusCode: number;
    code: string;
    context: string;
    message: string;
    data?: any;
}

export class AppError extends Error {
    statusCode: number;
    code: string;
    context: string;
    message: string;
    data: any;

    constructor({
                    statusCode = StatusCodes.UNPROCESSABLE_ENTITY,
                    code = 'APP_ERROR',
                    context,
                    message,
                    data = null
                }: ErrorDefinition, extraMessage?: string) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
        const extra = extraMessage ? `, ${extraMessage}` : '';
        this.statusCode = statusCode;
        this.code = code;
        this.context = context;
        this.message = message + extra;
        this.data = data;
    }
}

export class DuplicateError extends AppError {
    constructor(msg: string, ctx: string) {
        super({
            statusCode: StatusCodes.CONFLICT,
            code: 'DUPLICATE_DATA',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, DuplicateError.prototype);
    }
}

export class NotFoundError extends AppError {
    constructor(msg: string, ctx: string) {
        super({
            statusCode: StatusCodes.NOT_FOUND,
            code: 'DATA_NOT_FOUND',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class UnauthorizedError extends AppError {
    constructor(msg: string, ctx: string) {
        super({
            statusCode: StatusCodes.UNAUTHORIZED,
            code: 'UNAUTHORIZED',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}


export class InvalidSession extends AppError {
    constructor(msg: string, ctx: string) {
        super({
            statusCode: StatusCodes.UNAUTHORIZED,
            code: 'INVALID_SESSION',
            context: ctx ?? '',
            message: msg,
        });
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class ForbiddenError extends AppError {
    constructor(msg: string, ctx: string) {
        super({
            statusCode: StatusCodes.FORBIDDEN,
            code: 'FORBIDDEN',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

export class BadRequestError extends AppError {
    constructor(msg: string, ctx: string) {
        super({
            statusCode: StatusCodes.BAD_REQUEST,
            code: 'BAD_REQUEST',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}