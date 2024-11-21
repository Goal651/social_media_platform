import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import validator from '../validator/validator';

interface UserPayload {
    id?: string,
    email?: string
}


const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(404).json({ message: 'invalid request' })
            return
        }
        const token = jwt.sign({ email, password }, process.env.JWT_SECRET as string)
        res.status(200).json({ token })
    } catch (error) {
        console.error(error)
    }
}

const signUp = async (req: Request, res: Response) => {
    try {
        const { error,value } = validator.signUpDataSchema.validate(req.body)
        if (error) {
            res.status(404).json({ message: error.message })
            return
        }
        res.json(value)

    } catch (error) {
        console.error(error)
    }
}
export default {
    login,
    signUp
}