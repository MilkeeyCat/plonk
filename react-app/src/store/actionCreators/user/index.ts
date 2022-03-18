import {setData, setIsAuthed, UserActionEnum} from "../../reducers/user/types"
import {User} from "../../../common/types/User.type"

export const UserActionCreators = {
    // setData: (payload: any) => {
        setData: (payload: {[key in keyof User]: any}): setData => {
        return {type: UserActionEnum.SET_DATA, payload}
    },
    setIsAuthed: (payload: boolean): setIsAuthed => {
        return {type: UserActionEnum.SET_IS_AUTHED, payload}
    }
}