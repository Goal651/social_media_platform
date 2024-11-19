import { Router, Request, Response } from "express";
import validateUser from '../controllers/authController'

const router = Router()


router.get('/', validateUser.validateUser, (req: Request, res: Response) => {

})

export default router