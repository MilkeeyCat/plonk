import express from "express"
import path from "path"
import mongoose from "mongoose"
import dotenv from "dotenv"
import {authMiddleware} from "./middleware/auth.middleware.js"
import usersRouter from "./routes/users.routes.js"

dotenv.config()
const __dirname = path.resolve()
const app = express()

app.listen(4000, async () => {
    await mongoose.connect("mongodb://localhost/plonk").catch(e => console.log(e))
})

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Headers", "POST, PUT, GET, PATCH, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

app.use(express.json())
app.use("/public", express.static(path.resolve(__dirname, "static")))
app.use(usersRouter)