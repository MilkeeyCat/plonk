import {Genders} from "./Genders.type"

export type User<T = string> = {
    _id: string | T
    username: string | T
    first_name: string | T
    last_name: string | T
    email: string | T
    gender: Genders | T
    token: string | T
}