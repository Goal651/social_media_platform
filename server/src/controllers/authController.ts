import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import models from '../schema/models';

interface UserPayload {
    id: string;
    email: string;
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
        const data = {
            id: isValidUser._id,
            email: decoded.email
        }
        res.locals.user = data;
        next();


    } catch (err) {
        res.status(403).json({ message: 'Forbidden' });
        return
    }
};

export default {
    validateUser
};
