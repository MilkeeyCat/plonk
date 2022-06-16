import postgresql from "../db/db.js"
import {AVATAR_PATH} from "../utils/constants.js"

const connection = postgresql("comments")

class CommentsService {
    async createComment(obj = {text, author_id, post_id}) { // text, author_id, post_id
        return await connection.create(obj)
    }

    async getCommentsByPostId(postId) {
        return await connection.query(`SELECT comments.id, comments.text, comments.pub_date, comments.reply_id, CONCAT(users.first_name, ' ', users.last_name) as name, CONCAT('${AVATAR_PATH}/', users.avatar) as avatar
                    FROM comments
                    INNER JOIN users
                    ON comments.author_id=users.id
                    WHERE comments.post_id = ${postId}
                    ORDER BY comments.pub_date DESC`)
    }

    async getComment(text, author_id, post_id) {
        return await connection.query(`SELECT comments.id, comments.text, comments.pub_date, comments.reply_id, CONCAT(users.first_name, ' ', users.last_name) as name, CONCAT('${AVATAR_PATH}', '/', users.avatar) as avatar
                    FROM comments
                    INNER JOIN users
                    ON comments.author_id=users.id
                    WHERE comments.text = '${text}' AND comments.author_id = '${author_id}' AND comments.post_id = '${post_id}'
                    ORDER BY comments.pub_date DESC
                    LIMIT 1`)
    }

    async commentsCount(postId) {
        const res = await connection.query(`SELECT COUNT(id) FROM comments WHERE post_id = ${postId}`)

        return res.rows[0].count
    }
}

export default new CommentsService()