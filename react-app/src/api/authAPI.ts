import {RegisterFormFields} from "../common/types/RegisterFormFields.type"
import {instance} from "./instance"
import {LoginFormFields} from "../common/types/LoginFormFields.type"
import {Login, Register} from "./types/index.type"

export const authAPI = {
    async register(data: RegisterFormFields) {
        return instance.post<Register>("register", data)
            .then(res => res.data)
    },
    login(data: LoginFormFields) {
        return instance.post<Login>("login", data)
            .then(res => res.data)
    },
    getData() {
        return instance.post<Login>("get-user-data")
            .then(res => res.data)
    }
}