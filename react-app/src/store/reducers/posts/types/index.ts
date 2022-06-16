import {Post} from "../../../../common/types/Post"
import {Comment} from "../../../../common/types/Comment"

export interface IPostState {
    posts: Post[]
}

export enum PostActionEnum {
    SET_POSTS = "SET_POSTS",
    SET_USER_REACTION = "SET_USER_REACTION",
    SET_POST_COMMENT = "SET_POST_COMMENT",
    SET_NEW_POST = "SET_NEW_POST"
}

export interface setPosts {
    type: PostActionEnum.SET_POSTS
    payload: Post[]
}

export interface setUserReaction {
    type: PostActionEnum.SET_USER_REACTION,
    payload: {id: number, reaction: string}
}

export interface setPostComment {
    type: PostActionEnum.SET_POST_COMMENT,
    payload: {comment: Comment, id: number}
}

export interface setNewPost {
    type: PostActionEnum.SET_NEW_POST,
    payload: Post
}

export type IPostAction = setPosts | setUserReaction | setPostComment | setNewPost