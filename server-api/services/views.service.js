import postgresql from "../db/db.js"

const connection = postgresql("posts_views")

class ViewsService {
    async addView(obj = {user_id, post_id, ip}) {
        return await connection.create(obj)
    }
}

export default new ViewsService()