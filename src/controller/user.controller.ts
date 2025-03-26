import { Request, Response } from 'express';
import { ResponseFactory } from '../helpers/utils';
import argon2 from 'argon2';
import { getUserByUsername, newUser } from '../services/user.service';
import * as error from '../error';
import jwt from 'jsonwebtoken';

export async function register(req: Request, res: Response) {
    const { username, name, password } = req.body;

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        throw new error.ForbiddenError('Username already exists!', 'Register')
    }

    const hashedPassword = await argon2.hash(password);

    const result = await newUser(username, name, hashedPassword);
    res.send(ResponseFactory.success(result, 'User registered!'));
}

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);
    if (!user) {
        throw new error.UnauthorizedError('Invalid username or password!', 'Login')
    }

    const validPassword = await argon2.verify(user.password!, password);
    if (!validPassword) {
        throw new error.UnauthorizedError('Invalid username or password!', 'Login')
    }

    const jwtPayload = user;// as User;
    const token = jwt.sign(jwtPayload,
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    res.send(ResponseFactory.success({ token: token }, 'Login successful!'));
}