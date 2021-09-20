import {Form, HeaderActionEnum, setFormAction} from "../../reducers/header/types"

export const HeaderActionCreators = {
    setForm: (form: Form): setFormAction => {
        return {type: HeaderActionEnum.SET_FORM, payload: form}
    }
}