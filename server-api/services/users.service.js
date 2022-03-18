import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {User} from "../models/User.js"

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
        let user = await User.findOne({email: userData.email})

        console.log(await bcrypt.compare(userData.password, user.password))

        if (user && (await bcrypt.compare(userData.password, user.password))) {
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
}

export default new UsersService()