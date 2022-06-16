import {Comment} from "./Comment"

export interface Post {
    id: number,
    author_id: number,
    type: string,
    text: string,
    media_src: string,
    pub_date: string,
    views: number,
    name: string,
    avatar: string,
    commentscount: number,
    likes: number,
    dislikes: number,
    user_reaction: string | null,
    comments: Comment[]
}