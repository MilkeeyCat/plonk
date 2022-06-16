import {AppDispatch} from "../../state"
import {postAPI} from "../../../api/postAPI"
import {PostsActionCreators} from "../../actionCreators/posts"
import {ResponseStatuses} from "../../../api/types/statuses.type"

export const SendPost = (payload: { text: string, imageVideo: File | string, voice: Blob | "", file: string | File }, callback: () => void) => {
    return async (dispatch: AppDispatch) => {
        const res = await postAPI.sendPost(payload)

        try {
            if (res?.data.status === ResponseStatuses["POST_CREATED_SUCCESSFULLY"]) {
                // add post somehow 0.0
                console.log(res.data.post)
                callback()
                dispatch(PostsActionCreators.setNewPost(res.data.post))
            }
        } catch (e) {

        }
    }
}

export const ReceiveAndSetPosts = () => {
    return async (dispatch: AppDispatch) => {
        const posts = await postAPI.getPosts() as any

        dispatch(PostsActionCreators.setPosts(posts))
    }
}

export const PostViewed = (postId: number) => {
    return async (dispatch: AppDispatch) => {
        const postViewed = postAPI.postViewed(postId)
    }
}

export const SendComment = (comment: string, postId: number, callback: () => void) => {
    return async (dispatch: AppDispatch) => {
        const res = await postAPI.sendComment(comment, postId)

        try {
            if (res.data.status === ResponseStatuses["COMMENT_CREATED_SUCCESSFULLY"]) {
                callback()
                dispatch(PostsActionCreators.setPostComment(postId, res.data.comment))
            }
        } catch (e) {
            if (res.data.status === "COMMENT_CREATED_ERROR") {

            }
        }
    }
}

export const SendReaction = (postId: number, reaction: string) => {
    return async (dispatch: AppDispatch) => {
        const res = await postAPI.sendReaction(postId, reaction)

        try {
            if (res.data.status === ResponseStatuses["REACTION_SET_SUCCESSFULLY"]) {
                dispatch(PostsActionCreators.setUserReaction(postId, res.data.reaction))  // set locally some shit
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const DeletePost = (postId: number) => {
    return async (dispatch: AppDispatch) => {
        const res = await postAPI.deletePost(postId)

    }
}