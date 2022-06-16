import PostService from "../services/posts.service.js"
import {fileType} from "../utils/FileType.js"

class PostsController {
    async createPost(req, res) {
        // console.log(req.body)
        // console.log("lol")
        // console.log(req.files)
        const postText = req.body.text ?? ""
        const file = req.files[0]
        const uploadedFileType = fileType(file)
        let result = null

        // if (uploadedFileType?.type === "audio") {
        //     const result = await PostService.createPost({
        //         type: "audio",
        //         media_src: file.filename,
        //         text: postText,
        //         author_id: req.user.id
        //     })
        //     res.json({status: "Okie :3"})
        // } else if (uploadedFileType?.type === "image") {
        //     const result = await PostService.createPost({
        //         type: "image",
        //         media_src: file.filename,
        //         text: postText,
        //         author_id: req.user.id
        //     })
        //     res.json({status: "Okie :3"})
        // } else if (uploadedFileType?.type === "video") {
        //     const result = await PostService.createPost({
        //         type: "video",
        //         media_src: file.filename,
        //         text: postText,
        //         author_id: req.user.id
        //     })
        //     res.json({status: "Okie :3"})
        // }

        if (uploadedFileType?.type) {
            result = await PostService.createPost({
                type: uploadedFileType.type,
                media_src: file.filename,
                text: postText,
                author_id: req.user.id
            })
        } else if (!!postText) {
            result = await PostService.createPost({type: "text", text: postText, author_id: req.user.id})
        } else {
            res.status(400).json({text: "POST_CREATED_ERROR"})
        }

        //everything all right =D
        res.json({status: "POST_CREATED_SUCCESSFULLY", post: result})
    }

    async getPosts(req, res) {
        const posts = await PostService.getPosts(req.user.id)
        // const postAuthorAvatar = await UserService.getAvatar(req.user.id)
        // const postAuthorName = await UserService.getName(req.user.id)
        res.json(posts)
    }

    async postViewed(req, res) {
        const post_id = req.params.postId

        const obj = {
            post_id,
            ip: req.ip,
        }

        if (req.user.id) obj.user_id = req.user.id

        await PostService.postViewed(obj)

        res.json({status: "OK"})
    }

    async setReaction(req, res) {
        const postId = req.params.postId

        const reaction = req.body.reaction

        const reactions = ["like", "dislike"]

        if (reactions.includes(reaction)) {
            try {
                //     console.log(":DDD")
                const finalReaction = await PostService.setReaction(postId, req.user.id, reaction)
                res.json({status: "REACTION_SET_SUCCESSFULLY", reaction: finalReaction})
            } catch (e) {
                console.log(e)
                res.status(400).json({status: "REACTION_SET_ERROR"})
            }
        } else {
            res.status(400).json({status: "REACTION_SET_ERROR"})
        }
    }

    async deletePost(req, res) {
        const postId = req.params.postId

        const result = await PostService.deletePost(postId)

        res.json("done")
        // if(!result.length) {
        // res.json({status: "POST_DELETED_SUCCESSFULLY", postId})
        //
        // }
    }
}

export default new PostsController()