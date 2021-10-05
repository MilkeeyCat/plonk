import {Form, HeaderActionEnum, setFormAction, setIsFormChanged} from "../../reducers/header/types"

export const HeaderActionCreators = {
    setForm: (form: Form): setFormAction => {
        return {type: HeaderActionEnum.SET_FORM, payload: form}
    },
    setIsFormChanged: (status: boolean): setIsFormChanged => {
        return {type: HeaderActionEnum.SET_IS_FORM_CHANGED, payload: status}
    }
}