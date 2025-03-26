"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helpers/utils");
const http_status_codes_1 = require("http-status-codes");
const error_1 = require("../error");
const logger_1 = __importDefault(require("../helpers/logger"));
const errorHandler = (err, req, res, next) => {
    logger_1.default.error({
        endpoint: req.url,
        error: err.message,
        stack: err.stack,
    });
    if (err instanceof error_1.AppError) {
        const { statusCode, code, context, message, data } = err;
        return res.status(statusCode).json({
            status: 'error',
            errorCode: code,
            context,
            message,
            data,
        });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(utils_1.ResponseFactory.error("Something went wrong!"));
};
exports.default = errorHandler;
//# sourceMappingURL=error.middleware.js.map