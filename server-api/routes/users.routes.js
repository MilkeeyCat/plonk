import express from "express"
import UsersController from "../controllers/users.controller.js"

const router = new express.Router()

router.post("/register", UsersController.register)
router.post("/login", UsersController.login)

export default router