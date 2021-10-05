import {IUserAction, IUserState, UserActionEnum} from "./types"

const initialState: IUserState = {
    user: {
        _id: null,
        email: null,
        first_name: null,
        last_name: null,
        gender: null,
        token: null,
        username: null,
    },
    isAuthed: false
}

export const userReducer = (state: IUserState = initialState, action: IUserAction): IUserState => {
    switch (action.type) {
        case UserActionEnum.SET_DATA:
            return {...state, ...action.payload}
        case UserActionEnum.SET_IS_AUTHED:
            return {...state, isAuthed: action.payload}
        default:
            return state
    }
}