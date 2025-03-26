import { Request, Response } from 'express';
import { ResponseFactory } from '../helpers/utils';

export async function healthCheck(req: Request, res: Response) {
    res.send(ResponseFactory.success('API OK!'));
}