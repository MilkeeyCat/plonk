export type Form = "login" | "register"

export interface IHeaderState {
   form: Form
}

export enum HeaderActionEnum {
    SET_FORM = "SET_FORM"
}

export interface setFormAction {
    type: HeaderActionEnum.SET_FORM
    payload: Form
}



export type IHeaderAction = setFormAction