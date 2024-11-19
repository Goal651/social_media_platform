import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import models from '../schema/models';

// Define the UserPayload interface
interface UserPayload {
    id: string;
    email: string;
}

// Define a function to verify the token
const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    try {
        // Verify token and decode the payload
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string) as UserPayload;

        // Check if the user exists in the database
        const isUser = await models.User.findById(decoded.id).select('email');
        if (!isUser) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }

        req.user
        // Move to the next middleware or route handler
        next();
    } catch (err) {
        // Handle token verification errors
        res.status(403).json({ message: 'Forbidden' });
        return
    }
};

export default {
    validateUser
};
