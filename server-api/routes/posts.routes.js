import express from "express"
import PostsController from "../controllers/posts.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"
import multer from "multer"

// const upload = multer({dest: "./static"})

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    "audio/wav": "wav",
    "video/x-matroska": ".mkv",
    "image/svg+xml": "svg"
};

const upload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './static');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, Date.now() + '.' + ext);
        }
    }),
    // fileFilter: (req, file, cb) => {
    //     const isValid = !!MIME_TYPE_MAP[file.mimetype];
    //     let error = isValid ? null : new Error('Invalid mime type!');
    //     cb(error, isValid);
    // }
});


const router = new express.Router()

router.post("/create-post", authMiddleware, upload.any(), PostsController.createPost)

export default router