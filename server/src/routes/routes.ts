import { Router, Request, Response } from "express";
import validateUser from '../controllers/authController'
import appController from "../controllers/appController";

const router = Router()


router.get('/', validateUser.validateUser, (req: Request, res: Response) => {
})
router.post('/login', appController.login)
router.post('/signUp', appController.signUp)

export default router