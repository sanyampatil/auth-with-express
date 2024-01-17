import { Router } from 'express'
import { signup, signin, getUser, logout } from '../controller/authController.js'
import jwtAuth from '../middleware/jwtAuth.js'
const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.get('/user', jwtAuth,getUser)
authRouter.get('/logout', jwtAuth,logout)


export default authRouter
