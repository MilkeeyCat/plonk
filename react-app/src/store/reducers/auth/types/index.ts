export interface IAuthState {
    user: {},
    isAuth: boolean,
}

export enum AuthActionEnum {
    AUTH_USER = "AUTH_USER"
}

export interface authUser {
    type: AuthActionEnum.AUTH_USER
    data: {}
}



export type IAuthAction = authUser