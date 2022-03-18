import {AppDispatch} from "../../state"
import {postAPI} from "../../../api/postAPI"

export const SendPost = (payload: { text: string, imageVideo: File | string, voice: Blob | null, file: string | File}) => {

    return async (dispatch: AppDispatch) => {
        const res = await postAPI.sendPost(payload)
        console.log(res)
    }
}