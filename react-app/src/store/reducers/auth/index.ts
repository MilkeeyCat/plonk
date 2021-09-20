import {AuthActionEnum, IAuthAction, IAuthState} from "./types"


const initialState: IAuthState = {
    isAuth: false,
    user: {}
}

export const authReducer = (state = initialState, action: IAuthAction): IAuthState => {
    switch (action.type) {
        case AuthActionEnum.AUTH_USER:
            return state
        default:
            return state
    }
}