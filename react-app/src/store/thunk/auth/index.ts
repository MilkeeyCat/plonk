import {AppDispatch} from "../../state"
import {authAPI} from "../../../api/authAPI"
import {RegisterFormFields} from "../../../common/types/RegisterFormFields.type"
import {LoginFormFields} from "../../../common/types/LoginFormFields.type"
import {userActionCreators} from "../../actionCreators/user"

export const registerUser = (data: RegisterFormFields, setErrors: (...args: any[]) => void, callback?: () => void) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authAPI.register(data)
            if (callback) callback()
        } catch (e: any) {
            const errors = e.response.data.fields
            setErrors({})
            setErrors(errors)
        }
    }
}

export const loginUser = (data: LoginFormFields, setErrors: (...args: any[]) => void, callback?: () => void) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authAPI.login(data)

            dispatch(userActionCreators.setData(response.user))
            dispatch(userActionCreators.setIsAuthed(true))
            if (callback) callback()
        } catch (e: any) {
            console.log(e)
            const errors = e.response.data.fields
            setErrors({})
            setErrors(errors)
        }
    }
}