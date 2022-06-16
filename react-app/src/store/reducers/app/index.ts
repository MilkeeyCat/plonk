import {IAppAction, IAppState, AppActionEnum} from "./types"

const initialState: IAppState = {
    isInitialized: false,
    // body: null
}

export const appReducer = (state: IAppState = initialState, action: IAppAction): IAppState => {
    switch (action.type) {
        case AppActionEnum.SET_IS_INITIALIZED:
            return {...state, isInitialized: action.payload}
        default:
            return state
    }
}