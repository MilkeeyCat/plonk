import CommentsService from "../services/comments.service.js"
import ReactionService from "../services/reaction.service.js"
import ViewsService from "../services/views.service.js"
import {stringToNumber} from "../utils/StringToNumber.js"
import postgresql from "../db/db.js"
import {AVATAR_PATH, PUBLIC_PATH} from "../utils/constants.js"

const connection = postgresql("posts")

class PostsService {
    async createPost(payload) {
        await connection.create(payload)
        // let res = await Post.getPost({"posts.author_id": payload.author_id})
        let res = await connection.query(`SELECT posts.id, posts.type, posts.text, posts.pub_date, CONCAT('${PUBLIC_PATH}/', posts.media_src) as media_src,
                    CONCAT(users.first_name, ' ', users.last_name) as name, CONCAT('${AVATAR_PATH}/', users.avatar) as avatar, 
            (SELECT COUNT(*) FROM posts_views WHERE posts.id = posts_views.post_id) as views,
            (SELECT COUNT(*) FROM comments WHERE posts.id = comments.post_id) as commentsCount,
            (SELECT COUNT(*) FROM nameless_table WHERE post_id = posts.id AND nameless_table.reaction = 'like') as likes,
            (SELECT COUNT(*) FROM nameless_table WHERE post_id = posts.id AND nameless_table.reaction = 'dislike') as dislikes,
            (SELECT reaction FROM nameless_table WHERE user_id = ${payload.author_id} AND post_id = posts.id) as user_reaction
            FROM posts
            INNER JOIN users
            ON posts.author_id=users.id
            WHERE posts.author_id = users.id AND users.id = ${payload.author_id}
            ORDER BY posts.pub_date DESC
            LIMIT 1`)

        res = res.rows[0]
        res.comments = []

        return res
    }

    async getPosts(userId) {
        let posts = await connection.query(
            `SELECT posts.id, posts.type, posts.text, posts.pub_date, CONCAT('${PUBLIC_PATH}/', posts.media_src) as media_src,
                    CONCAT(users.first_name, ' ', users.last_name) as name, CONCAT('${AVATAR_PATH}/', users.avatar) as avatar, 
            (SELECT COUNT(*) FROM posts_views WHERE posts.id = posts_views.post_id) as views,
            (SELECT COUNT(*) FROM comments WHERE posts.id = comments.post_id) as commentsCount,
            (SELECT COUNT(*) FROM nameless_table WHERE post_id = posts.id AND nameless_table.reaction = 'like') as likes,
            (SELECT COUNT(*) FROM nameless_table WHERE post_id = posts.id AND nameless_table.reaction = 'dislike') as dislikes,
            (SELECT reaction FROM nameless_table WHERE user_id = ${userId} AND post_id = posts.id) as user_reaction
            FROM posts
            INNER JOIN users
            ON posts.author_id=users.id AND users.id = ${userId}
            ORDER BY posts.pub_date DESC`)

        posts = posts.rows

        for (let post of posts) {
            const res = await CommentsService.getCommentsByPostId(post.id)
            post.comments = res.rows

            stringToNumber(post, ["author_id", "id", "dislikes", "likes", "views", "commentscount"])
        }


        return posts
    }

    async postViewed(obj = {user_id, post_id, ip}) {
        // return await connection.create(`INSERT INTO posts_views`)
        return await ViewsService.addView(obj)
    }

    async setReaction(postId, userId, reaction) {
        let oldReaction = await ReactionService.get(postId)
        oldReaction = oldReaction.rows
        let res = reaction

        console.log(oldReaction)

        if (oldReaction.length) {
            // reaction already exists
            if (oldReaction[0].reaction === reaction) {
                // delete reaction
                res = ""
                await ReactionService.deleteReaction({userId, postId})
            } else {
                // change reaction
                await ReactionService.updateReaction({postId, reaction})
            }
        } else {
            // create reaction
            await ReactionService.createReaction({postId, userId, reaction})
        }

        return res

    }

    async deletePost(postId) {
        await connection.delete({id: postId})
        await connection.query(`DELETE FROM comments WHERE post_id = ${postId}`)

        return "Ok"
    }
}

export default new PostsService()