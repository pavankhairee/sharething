import { Router } from "express";
import { createPost, feed } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const userRouter = Router()

userRouter.post('/post', authenticate, createPost)

userRouter.get('/feed', authenticate, feed)

export { userRouter }