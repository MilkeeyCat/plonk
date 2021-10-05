import {RegisterFormFields} from "../../common/types/RegisterFormFields.type"
import {User} from "../../common/types/User.type"
import {LoginFormFields} from "../../common/types/LoginFormFields.type"

type RegisterSuccess = {}

type RegisterError = {
    fields: RegisterFormFields
}

export type Register = RegisterSuccess & RegisterError

type LoginSuccess = {
    user: User
}

type LoginError = {
    fields: LoginFormFields
}

export type Login = LoginSuccess & LoginError