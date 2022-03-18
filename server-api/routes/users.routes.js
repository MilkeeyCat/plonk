import express from "express"
import UsersController from "../controllers/users.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"

const router = new express.Router()

router.post("/register", UsersController.register)
router.post("/login", UsersController.login)
router.post("/get-user-data", authMiddleware, UsersController.getUserData)

export default router