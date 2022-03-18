import {AppDispatch} from "../../state"
import {authAPI} from "../../../api/authAPI"
import {RegisterFormFields} from "../../../common/types/RegisterFormFields.type"
import {LoginFormFields} from "../../../common/types/LoginFormFields.type"
import {UserActionCreators} from "../../actionCreators/user"

export const registerUser = (data: RegisterFormFields, setErrors: (...args: any[]) => void, callback?: () => void) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authAPI.register(data)
            if (callback) callback()
        } catch (e: any) {
            const errors = e.response.data
            setErrors({})
            setErrors(errors)
        }
    }
}

export const loginUser = (data: LoginFormFields, setErrors: (...args: any[]) => void, callback?: () => void) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authAPI.login(data)

            dispatch(UserActionCreators.setData(response.user))
            dispatch(UserActionCreators.setIsAuthed(true))
            if (callback) callback()
        } catch (e: any) {
            console.log(e)
            const errors = e.response.data
            setErrors({})
            setErrors(errors)
        }
    }
}

export const getData = async (dispatch: AppDispatch) => {
    try {
        const response = await authAPI.getData()
        dispatch(UserActionCreators.setData(response.user))
        dispatch(UserActionCreators.setIsAuthed(true))
    } catch (e: any) {
        console.log(e)
        dispatch(UserActionCreators.setIsAuthed(false))
        return true
    }
}