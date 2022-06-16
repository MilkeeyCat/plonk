import express from "express"
import PostsController from "../controllers/posts.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"
import multer from "multer"
import {fileType} from "../utils/FileType.js"

// const upload = multer({dest: "./static"})

const upload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./static")
        },
        filename: (req, file, cb) => {
                // cb(null, "images/" + Date.now() + "." + ext)
            const uploadedFileType = fileType(file)

            if(uploadedFileType.type === "audio") cb(null, "audio/" + Date.now() + "." + uploadedFileType.ext)
            if(uploadedFileType.type === "video") cb(null, "videos/" + Date.now() + "." + uploadedFileType.ext)
            if(uploadedFileType.type === "image") cb(null, "images/" + Date.now() + "." + uploadedFileType.ext)
        }
    }),
    fileFilter: (req, file, cb) => {
        // const isValid = !!MIME_TYPE_MAP[file.mimetype]
        // let error = isValid ? null : new Error("Invalid mime type!")
        cb(null, true)
    }
})


const router = new express.Router()

router.post("/create-post", authMiddleware, upload.any(), PostsController.createPost)
router.get("/posts", authMiddleware, PostsController.getPosts)
router.get("/post-viewed/:postId", authMiddleware, PostsController.postViewed)

router.post("/posts/reaction/:postId", authMiddleware, PostsController.setReaction)
router.delete("/posts/delete/:postId", authMiddleware, PostsController.deletePost)

export default router