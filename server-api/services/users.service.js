import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class UsersService {
    async register(userData) {
        const encryptedPassword = await bcrypt.hash(userData.password, 10)

        const user = await User.create({
            ...userData,
            password: encryptedPassword,
        })

        const token = jwt.sign(
            {user_id: user._id, email: userData.email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )
        user.token = token

        return user
    }

    async login(userData) {
        const user = await User.findOne({email: userData.email})

        if (user && (await bcrypt.compare(userData.password, user.password))) {
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )

            user.token = token
        }

        return user
    }
}

export default new UsersService()