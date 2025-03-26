import { Request, Response, NextFunction } from "express";
import { ResponseFactory } from "../helpers/utils";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../error";
import logger from "../helpers/logger";

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error({
        endpoint: req.url,
        error: err.message,
        stack: err.stack,
    });

    if (err instanceof AppError) {
        const { statusCode, code, context, message, data } = err;

        return res.status(statusCode).json({
            status: 'error',
            errorCode: code,
            context,
            message,
            data,
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        ResponseFactory.error("Something went wrong!")
    );
};

export default errorHandler;
