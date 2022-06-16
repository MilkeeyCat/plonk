import CommentsService from "../services/comments.service.js"

class CommentsController {

    async createComment(req, res) {

        const post_id = req.params.postId
        const author_id = req.user.id
        const text = req.body.comment

        try {
            const asd = await CommentsService.createComment({text, author_id, post_id})
            const comment = await CommentsService.getComment(text, author_id, post_id)

            if (comment.rowsCount) {
                res.json({status: "COMMENT_CREATED_SUCCESSFULLY", comment: comment.rows[0]})
            }
        } catch (e) {
            res.status(500).json({status: "COMMENT_CREATED_ERROR"})
        }

    }

}

export default new CommentsController()
