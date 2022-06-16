import express from "express"
import CommentsController from "../controllers/comments.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"

const router = new express.Router()

router.post("/comments/create/:postId", authMiddleware, CommentsController.createComment)

export default router