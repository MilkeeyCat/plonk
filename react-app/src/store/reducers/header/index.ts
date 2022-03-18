import {HeaderActionEnum, IHeaderAction, IHeaderState} from "./types"

const initialState: IHeaderState = {
    form: "register",
    isFormChanged: false
}

export const headerReducer = (state: IHeaderState = initialState, action: IHeaderAction): IHeaderState => {
    switch (action.type) {
        case HeaderActionEnum.SET_FORM:
            return {...state, form: action.payload}
        case HeaderActionEnum.SET_IS_FORM_CHANGED:
            return {...state, isFormChanged: action.payload}
        default:
            return state
    }
}