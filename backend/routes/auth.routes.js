import { Router } from "express";
const AuthRouter = Router()
import { getme, login, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

//User regester
AuthRouter.post('/signup', register)

//user loin 
AuthRouter.post('/signin', login)

//me
AuthRouter.get('/me', authenticate, getme)

export { AuthRouter }