import {Genders} from "./Genders.type"

export type RegisterFormFields = {
    first_name: string
    last_name: string
    email: string
    gender: Genders
    password: string
}