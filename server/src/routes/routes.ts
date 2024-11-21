import { Router, Request, Response } from "express";
import validateUser from '../controllers/authController'
import appController from "../controllers/appController";

const router = Router()


router.get('/', validateUser.validateUser, (req: Request, res: Response) => {
    res.status(200).json({ message: 'okay are you there?' })
})
router.post('/login', appController.login)
router.post('/signUp', appController.signUp)
router.post('/registerGroup',appController.registerGroup)

router.get('/fetchAllUsers', appController.fetchAllUsers)

export default router