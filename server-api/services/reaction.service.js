import postgresql from "../db/db.js"

const connection = postgresql("nameless_table")

class ReactionService {
    async get(postId) {
        return await connection.find({post_id: postId})
    }

    async deleteReaction({userId, postId}) {
        return await connection.delete({user_id: userId, post_id: postId})
    }

    async createReaction({postId, userId, reaction}) {
        return await connection.create({post_id: postId, user_id: userId, reaction})
    }

    async updateReaction({postId, reaction}) {
        return await connection.update({reaction}, {post_id: postId})
    }
}

export default new ReactionService()