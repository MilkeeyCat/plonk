import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {AVATAR_PATH} from "../utils/constants.js"
import postgresql from "../db/db.js"

const connection = postgresql("users")

class UsersService {
    async register(userData) {
        const encryptedPassword = await bcrypt.hash(userData.password, 10)
        return await connection.create({
            ...userData,
            username: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + `__${userData.first_name}_${userData.last_name}`,
            password: encryptedPassword,
        })
    }

    async login(userData) {
        let user = await connection.query(`SELECT *, CONCAT('${AVATAR_PATH}', '/', avatar) as avatar FROM users WHERE email = '${userData.email}'`)

        user = user.rows[0]

        if (user && (await bcrypt.compare(userData.password, user?.password ?? ""))) {
            const token = jwt.sign(
                {id: user.id, email: user.email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )

            return {user, token}
        }

        return {}
    }

    async findUser({email, id = null}) {
        let user = await connection.query(`SELECT *, CONCAT('${AVATAR_PATH}', '/', avatar) as avatar FROM users WHERE ${!!id ? `id = '${id}' AND` : ""} email = '${email}'`)
        user = user.rows[0]

        return user
    }
}

export default new UsersService()