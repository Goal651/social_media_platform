import { Router, Request, Response } from "express";
import validateUser from '../controllers/authController'
import appController from "../controllers/appController";

const router = Router()


router.get('/', validateUser.validateUser, (req: Request, res: Response) => {
    res.status(200).json({ message: 'okay are you there?' })
})
router.post('/login', appController.login)
router.post('/signUp', appController.signUp)
router.post('/registerGroup', validateUser.validateUser, appController.registerGroup)

router.get('/fetchAllUsers', validateUser.validateUser, appController.fetchAllUsers)
router.get('/fetchCurrentUser', validateUser.validateUser, appController.fetchCurrentUser)
router.get('/fetchSpecificUser/:userEmail', validateUser.validateUser, appController.fetchSpecificUser)
router.get('/fetchAllGroups/', validateUser.validateUser, appController.fetchAllGroups)

export default router