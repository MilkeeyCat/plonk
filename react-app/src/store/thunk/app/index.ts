import {getData} from "../auth"
import {AppDispatch} from "../../state"
import {AppActionCreators} from "../../actionCreators/app"

export const initialize = async (dispatch: AppDispatch) => {
    Promise.all([getData(dispatch)]).then(response => {
            dispatch(AppActionCreators.setIsInitialized(true))
        }
    )
}