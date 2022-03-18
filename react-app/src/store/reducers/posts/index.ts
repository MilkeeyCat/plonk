import {PostActionEnum, IPostAction, IPostState} from "./types"

const initialState: IPostState = {
    posts: []
}

export const postReducer = (state: IPostState = initialState, action: IPostAction): IPostState => {
    switch (action.type) {
        case PostActionEnum.SET_POSTS:
            return {...state, posts: action.payload}
        default:
            return state
    }
}