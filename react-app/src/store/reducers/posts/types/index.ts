export interface IPostState {
    posts: []
}

export enum PostActionEnum {
    SET_POSTS = "SET_POSTS"
}

type setPosts = {
    type: PostActionEnum.SET_POSTS
    payload: []
}

export type IPostAction = setPosts