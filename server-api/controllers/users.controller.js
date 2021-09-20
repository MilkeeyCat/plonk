import bcrypt from "bcryptjs"
import {User} from "../models/user.model.js"
import UsersService from "../services/users.service.js"

class UsersController {
    async register(req, res) {
        // try {
        //     const {first_name, last_name, email, password} = req.body
        //
        //     if (!(email && password && first_name && last_name)) {
        //         res.status(400).send("All input is required")
        //     }
        //
        //     const oldUser = await User.findOne({email})
        //
        //     if (oldUser) {
        //         return res.status(409).json({error: "User Already Exist. Please Login"})
        //     }
        //
        //     const user = UsersService.register({first_name, last_name, email, password})
        //
        //     res.status(201).json(user)
        // } catch (err) {
        //     console.log(err)
        // }
        res.json("LOL")
    }

    async login(req, res) {
        try {
            const {email, password} = req.body

            if (!(email && password)) {
                res.status(400).send({error: "All input is required"})
            }
            const user = await User.findOne({email})

            if (!user && !(await bcrypt.compare(password, user.password))) {
                res.status(400).json({error: "Invalid Credentials"})
            }

            const authedUser = UsersService.login({email, password})

            res.json(authedUser)

        } catch (err) {
            console.log(err)
        }
    }
}

export default new UsersController()