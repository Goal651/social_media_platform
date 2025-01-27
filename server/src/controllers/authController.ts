import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import models from '../schema/models';

interface UserPayload {
    id: string;
    email: string;
}

const generateAccessToken = (id: string, email: string): string => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
}

const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accessToken = req.headers.accesstoken;
    if (!accessToken || typeof accessToken !== 'string') {
        res.status(401).json({ message: 'bad request' });
        return
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string) as UserPayload;
        const isValidUser = await models.User.findOne({ email: decoded.email }).select('_id email');
        if (!isValidUser) {
            res.status(401).json({ message: 'bad request' });
            return
        }
        const data = { id: isValidUser._id, email: decoded.email }
        res.locals.user = data;
        next();
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            const dataFromToken = jwt.decode(accessToken) as UserPayload;
            const newToken = generateAccessToken(dataFromToken.id, dataFromToken.email);
            res.status(400).json({ token:newToken })
            return
        }
        res.status(403).json({ message: 'Forbidden' });
        return
    }
};

const checkUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const { email, id } = res.locals.user as UserPayload;
        const isValidUser = await models.User.findOne({ email: email }).select('_id email');
        if (!isValidUser) {
            res.status(401).json({ message: 'invalid user' });
            return;
        }
        res.status(200).json({ message: 'valid user' })
    } catch (err) {
        res.status(403).json({ message: 'Forbidden' });
    }
};

export default {
    validateUser,
    checkUser
};
