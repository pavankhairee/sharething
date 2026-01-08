import express from "express"
import { AuthRouter } from "./routes/auth.routes.js"
import { dbconnect } from "./database.js"
import { userRouter } from "./routes/user.routes.js"
const app = express()
app.use(express.json())
dbconnect()

app.use('/auth', AuthRouter)

app.use('/user', userRouter)

app.listen(3000)