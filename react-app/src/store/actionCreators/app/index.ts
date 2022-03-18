import {AppActionEnum, setIsInitialized} from "../../reducers/app/types"

export const AppActionCreators = {
    setIsInitialized: (payload: boolean): setIsInitialized => {
        return {type: AppActionEnum.SET_IS_INITIALIZED, payload}
    }
}