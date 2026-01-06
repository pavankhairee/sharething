import express from "express"
import { AuthRouter } from "./routes/auth.routes.js"
import { dbconnect } from "./database.js"
const app = express()
app.use(express.json())
dbconnect()
app.use('/user', AuthRouter)


app.listen(3000)