import {HeaderActionEnum, IHeaderState, IHeaderAction} from "./types"

const initialState: IHeaderState = {
    form: "login"
}

export const headerReducer = (state: IHeaderState = initialState, action: IHeaderAction): IHeaderState => {
    switch (action.type) {
        case HeaderActionEnum.SET_FORM:
            return {...state, form: action.payload}
        default:
            return state
    }
}