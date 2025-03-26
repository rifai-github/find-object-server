import { Response, NextFunction } from 'express';
import * as error from '../error';
import jwt from 'jsonwebtoken';
import { User } from '../services/user.service';

export async function tokenChecker(req: any, res: Response, next: NextFunction) {
    
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
        return next(new error.UnauthorizedError('No \'Authorization\' in header', 'tokenChecker'))
    }
    
    try {
        const token = bearerToken.split('Bearer ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded as User;

        return next();
    } catch (err) {
        return next(new error.UnauthorizedError('Authorization Failed', 'tokenChecker'))
    }
}