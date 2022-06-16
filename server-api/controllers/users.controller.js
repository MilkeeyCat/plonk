import bcrypt from "bcryptjs"
import UsersService from "../services/users.service.js"

class UsersController {
    async register(req, res) {
        try {
            const {first_name, last_name, email, password, gender} = req.body
            const errors = {}

            const oldUser = await UsersService.findUser({email}) //
            // console.log(oldUser, ":DD:D:")

            if (oldUser) {
                errors.email = "User Already Exist. Please Login"
            }

            if (!(email && password && first_name && last_name && gender)) {
                const data = {first_name, last_name, email, password, gender}

                Object.keys(data).forEach(key => {
                    if (data[key] === "") errors[key] = "Field is required"
                })

            }

            if (Object.keys(errors).length) {
                return res.status(400).json(errors)
            }

            const user = await UsersService.register({first_name, last_name, email, password, gender})

            res.status(201).json(user)
        } catch (err) {
            console.log(err)
        }
    }

    async login(req, res) {
        try {
            // console.log(await process.postgresql.query("DELETE FROM posts WHERE id = 35;"))
            const {email, password} = req.body
            const errors = {}

            const {user, token} = await UsersService.login({email, password})

            if (!(email && password)) {
                errors.email = "Email or password is invalid"
                errors.password = "Email or password is invalid"
            }
            if (!user || !(await bcrypt.compare(password, user?.password))) {
                errors.email = "Email or password is invalid"
                errors.password = "Email or password is invalid"
            }

            if (Object.keys(errors).length) {
                return res.status(400).json(errors)
            }

            res.cookie("token", token, {httpOnly: true})
            return res.json({user})
        } catch (err) {
            console.log(err)
        }
    }

    async getUserData(req, res) {
        try {
            const user = await UsersService.findUser({email: req.user.email, id: req.user.id})

            return res.json({user})
        } catch (e) {
            console.log(e)
        }
    }
}

export default new UsersController()