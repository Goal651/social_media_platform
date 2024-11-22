import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import validator from '../validator/validator';
import models from '../schema/models';
import functions from '../functions/function';
import path from 'path';


interface UserPayload {
    id?: string,
    email?: string
}

interface DataToSave {
    names: string,
    email: string,
    password: string,
    publicKey: string,
    privateKey: string
}

interface UserToSend {
    username: string,
    image: string,
    names: string,
    email: string,
    id: string
}
const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error(error)
        return 'error'
    }
}

const signUp = async (req: Request, res: Response) => {
    try {
        const { error, value } = validator.signUpDataSchema.validate(req.body)
        if (error) {
            res.status(404).json({ message: error.message })
            return
        }

        const isRegistered = !!(await models.User.findOne({ email: value.email }))
        if (isRegistered) {
            res.status(404).json({ message: 'user already registered' })
            return
        }

        const { publicKey, privateKey } = await functions.generateKeyPair()
        const newPassword = await hashPassword(value.password)
        const dataToSave: DataToSave = { ...value, password: newPassword, publicKey, privateKey }

        const newUser = new models.User(dataToSave)
        await newUser.save()

        res.status(200).json({ message: 'user created' })
    } catch (error) {
        res.status(500).json({ message: 'its a server error' })
        console.error(error)
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = validator.loginDataSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }

        const { email, password } = value
        const user = await models.User.findOne({ email })
        if (!user) {
            res.status(404).json({ message: 'email not found' })
            return
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            res.status(401).json({ message: 'invalid password' })
            return
        }

        const token = jwt.sign({ email, password }, process.env.JWT_SECRET as string)
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: 'its a server error' })
        console.error(error)
    }
}


const registerGroup = async (req: Request, res: Response) => {
    try {
        const { error, value } = validator.registerGroupDataSchema.validate(req.body)
        if (error) {
            res.status(404).json({ message: error.message })
            return
        }

        const userPayload = res.locals.user as UserPayload

        const isGroupRegistered = !!(await models.Group.findOne({ groupName: value.groupName }))
        if (isGroupRegistered) {
            res.status(404).json({ message: 'group already registered' })
            return
        }

        const groupKeys = functions.generateGroupKeys()
        const groupDataToSave = { ...value, ...groupKeys }

        const newGroup = new models.Group(groupDataToSave)
        await newGroup.save()
        await models.User.findOneAndUpdate({ email: userPayload.email }, { $push: { groups: newGroup._id } })
        await models.Group.findOneAndUpdate({ _id: newGroup._id }, { $push: { admin: userPayload.id } })

        res.status(200).json({ message: 'group created' })
    }
    catch (error) {
        res.status(500).json({ message: 'its a server error' })
        console.log(error)
    }
}

const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        const userPayload = res.locals.user as UserPayload
        const users = await models.User.find({ email: { $ne: userPayload.email } }).select('_id names email image')
        if (!users) {
            res.status(404).json({ message: 'users not found' })
            return
        }

        const dataToSend: UserToSend[] = users.map(user => ({
            username: user.names,
            image: user.image,
            names: user.names,
            email: user.email,
            id: user._id.toString(),
        }));

        res.status(200).json({ users: dataToSend })
    }
    catch (error) {
        res.status(500).json({ message: 'its a server error' })
        console.log(error)
    }
}

const fetchCurrentUser = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.user as UserPayload
        const getUser = await models.User.findById(userData.id).
            select('-password -privateKey -publicKey')
            .populate([
                { path: 'groups', select: '-privateKey -publicKey -iv' },
                { path: 'friends', select: '-password -privateKey -publicKey' }
            ])
        res.status(200).json({ userDetails: getUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

const fetchSpecificUser = async (req: Request, res: Response) => {
    try {
        const { userEmail } = req.params
        const getUser = await models.User.findOne({ email: userEmail }).
            select('-password -privateKey -publicKey -unreadMessages')
        if (!getUser) {
            res.status(400).json({ message: 'User not found' })
            return
        }
        res.status(200).json({ userDetails: getUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }
}


const fetchAllGroups = async (req: Request, res: Response) => {
    try {
        const userPayload = res.locals.user as UserPayload
        const groups = await models.Group
            .find({
                $or: [
                    { members: userPayload.id },
                    { admin: userPayload.id }]
            })
            .select('-privateKey -iv')
        if (!groups) {
            res.status(404).json({ message: 'No group found' })
            return
        }

        res.status(200).json({ groups })
    }
    catch (error) {
        res.status(500).json({ message: 'its a server error' })
        console.log(error)
    }
}

const fetchSpecificGroup = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params
        const userData = res.locals.user as UserPayload
        const group = await models.Group.findOne({ _id: groupId, $or: [{ members: userData.id }, { admin: userData.id }] })
            .select('-privateKey -iv')
            .populate([
                { path: 'members', select: '-password -privateKey -publicKey -unreadMessages -groups -friends' },
                { path: 'admin', select: '-password -privateKey -publicKey -unreadMessages -groups -friends' }
            ])

        if (!group) {
            res.status(404).json({ message: 'Group not found' })
            return
        }

        const dataToSend = {
            id: group._id,
            groupName: group.groupName,
            admin: group.admin,
            members: group.members,
            groupImage: group.image,
        }

        res.status(200).json({ group: dataToSend })
    } catch (error) {
        res.status(500).json({ message: 'its a server error' })
        console.log(error)
    }
}

const editCurrentUser = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.user as UserPayload
        const user = await models.User.findById(userData.id)
        if (!user) {
            res.status(404).json({ message: 'user not found' })
            return
        }

        const { names, image } = req.body
        user.names = names
        user.image = image
        await user.save()
        
        res.status(200).json({ message: 'user updated' })
    } catch (error) {
        res.status(500).json({ message: 'its a server error' })
        console.log(error)
    }
}



export default {
    login,
    signUp,
    registerGroup,
    fetchAllUsers,
    fetchCurrentUser,
    fetchSpecificUser,
    fetchAllGroups,
    fetchSpecificGroup,
    editCurrentUser
}