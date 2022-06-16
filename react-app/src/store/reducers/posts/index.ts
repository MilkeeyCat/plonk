import {IPostAction, IPostState, PostActionEnum} from "./types"

const initialState: IPostState = {
    posts: []
}

export const postsReducer = (state: IPostState = initialState, action: IPostAction): IPostState => {
    switch (action.type) {
        case PostActionEnum.SET_POSTS:
            return {...state, posts: action.payload}
        case PostActionEnum.SET_USER_REACTION:
            return {
                ...state, posts: state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        if(action.payload.reaction === "like") {
                            post.likes++
                            if(!!post.user_reaction) post.dislikes--
                        } else if(action.payload.reaction === "dislike") {
                            post.dislikes++
                            if(!!post.user_reaction) post.likes--

                        } else if (action.payload.reaction === "") {
                            if(post.user_reaction === "like") post.likes--
                            if(post.user_reaction === "dislike") post.dislikes--
                        }

                        post.user_reaction = action.payload.reaction
                    }

                    return post
                })
            }
        case PostActionEnum.SET_POST_COMMENT:
            return {...state, posts: state.posts.map(post => {
                    if(post.id === action.payload.id) {
                        post.comments = [action.payload.comment, ...post.comments]
                        post.commentscount++
                    }
                    return post
                })}
        case PostActionEnum.SET_NEW_POST:
            return {...state, posts: [action.payload, ...state.posts]}
        default:
            return state
    }
}