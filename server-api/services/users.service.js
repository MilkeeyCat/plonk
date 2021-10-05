import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class UsersService {
    async register(userData) {
        const encryptedPassword = await bcrypt.hash(userData.password, 10)

        return await User.create({
            ...userData,
            username: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + `__${userData.first_name}_${userData.last_name}`,
            password: encryptedPassword,
        })
    }

    async login(userData) {
        let user = await User.findOne({email: userData.email}).lean()

        if (user && (await bcrypt.compare(userData.password, user.password))) {
            const token = jwt.sign(
                {user_id: user._id, email: user.email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )

            return {user, token}
        }

    }
}

export default new UsersService()