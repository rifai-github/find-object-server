"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.ForbiddenError = exports.InvalidSession = exports.UnauthorizedError = exports.NotFoundError = exports.DuplicateError = exports.AppError = void 0;
const http_status_codes_1 = require("http-status-codes");
class AppError extends Error {
    constructor({ statusCode = http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, code = 'APP_ERROR', context, message, data = null }, extraMessage) {
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
exports.AppError = AppError;
class DuplicateError extends AppError {
    constructor(msg, ctx) {
        super({
            statusCode: http_status_codes_1.StatusCodes.CONFLICT,
            code: 'DUPLICATE_DATA',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, DuplicateError.prototype);
    }
}
exports.DuplicateError = DuplicateError;
class NotFoundError extends AppError {
    constructor(msg, ctx) {
        super({
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            code: 'DATA_NOT_FOUND',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends AppError {
    constructor(msg, ctx) {
        super({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            code: 'UNAUTHORIZED',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InvalidSession extends AppError {
    constructor(msg, ctx) {
        super({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            code: 'INVALID_SESSION',
            context: ctx ?? '',
            message: msg,
        });
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
exports.InvalidSession = InvalidSession;
class ForbiddenError extends AppError {
    constructor(msg, ctx) {
        super({
            statusCode: http_status_codes_1.StatusCodes.FORBIDDEN,
            code: 'FORBIDDEN',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
class BadRequestError extends AppError {
    constructor(msg, ctx) {
        super({
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            code: 'BAD_REQUEST',
            context: ctx ?? '',
            message: msg,
            data: null
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=error.js.map