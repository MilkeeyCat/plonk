import {User} from "../../../../common/types/User.type"
import {Genders} from "../../../../common/types/Genders.type"

export enum UserActionEnum {
    SET_DATA = "SET_DATA",
    SET_IS_AUTHED = "SET_IS_AUTHED",
}

export interface IUserState {
    user: User<null>
    isAuthed: boolean | null
}

export interface setData {
    type: UserActionEnum.SET_DATA
    payload: { [key in keyof User]: Genders }
}

export interface setIsAuthed {
    type: UserActionEnum.SET_IS_AUTHED
    payload: boolean
}

export type IUserAction = setData | setIsAuthed