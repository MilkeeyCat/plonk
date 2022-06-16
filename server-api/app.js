import express from "express"
import path from "path"
import dotenv from "dotenv"
import usersRouter from "./routes/users.routes.js"
import postsRouter from "./routes/posts.routes.js"
import commentsRouter from "./routes/comments.routes.js"
import cookieParser from "cookie-parser"

dotenv.config()
const __dirname = path.resolve()
const app = express()

// app.listen(4000, async () => {
// await mongoose.connect("mongodb://localhost/plonk").catch(e => console.log(e))
// })


app.listen(4000, "127.0.0.1")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))
app.set("trust proxy", true)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, DELETE, OPTIONS")
    next()
})

app.use(express.json())
app.use(cookieParser())
app.use("/public", express.static(path.resolve(__dirname, "static")))
app.use(usersRouter)
app.use(postsRouter)
app.use(commentsRouter)