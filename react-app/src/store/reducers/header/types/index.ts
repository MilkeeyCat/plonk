export type Form = "login" | "register"

export interface IHeaderState {
    form: Form,
    isFormChanged: boolean,
}

export enum HeaderActionEnum {
    SET_FORM = "SET_FORM",
    SET_IS_FORM_CHANGED = "SET_IS_FORM_CHANGED",
}

export interface setFormAction {
    type: HeaderActionEnum.SET_FORM
    payload: Form
}

export interface setIsFormChanged {
    type: HeaderActionEnum.SET_IS_FORM_CHANGED
    payload: boolean
}

export type IHeaderAction = setFormAction | setIsFormChanged