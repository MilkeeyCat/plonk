import {Post} from "../../../common/types/Post"
import {PostActionEnum, setNewPost, setPostComment, setPosts, setUserReaction} from "../../reducers/posts/types"
import {Comment} from "../../../common/types/Comment"

export const PostsActionCreators = {
   setPosts: (posts: Post[]): setPosts => {
        return {type: PostActionEnum.SET_POSTS, payload: posts}
    },
    setUserReaction: (id: number, reaction: string): setUserReaction => {
       return {type: PostActionEnum.SET_USER_REACTION, payload: {id, reaction}}
    },
    setPostComment: (postId: number, comment: Comment): setPostComment => {
       return {type: PostActionEnum.SET_POST_COMMENT, payload: {id: postId, comment}}
    },
    setNewPost: (post: Post): setNewPost => {
       return {type: PostActionEnum.SET_NEW_POST, payload: post}
    }
}