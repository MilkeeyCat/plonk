import React from "react"
import {Avatar} from "../Avatar"
import {timeDiffCalc} from "../../../utils/TimeDiffCalc"
import {AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineEye, AiOutlineLike} from "react-icons/ai"
import {FaRegComments} from "react-icons/fa"
import {Post} from "../../types/Post"
import "./styles.scss"
import {useInView} from "react-intersection-observer"
import {useDispatch} from "react-redux"
import {PostViewed, SendReaction} from "../../../store/thunk/post"
import {AppAudio} from "../AppAudio"
import {PostComments} from "./PostComments"
import {PostCommentForm} from "./PostCommentForm"

interface Props {
    setEvent: (e: React.MouseEvent) => void,
    setHidden: (arg: boolean) => void,
    setPostId: (arg: number) => void
}

export const AppPost: React.FC<Post & Props> = React.memo(({text, avatar, name, pub_date, views, type, media_src, id, comments, user_reaction, commentscount, likes, dislikes, setEvent, setHidden, setPostId}) => {

    const {ref, inView, entry} = useInView({triggerOnce: true})
    const dispatch = useDispatch()

    if (inView) dispatch(PostViewed(id))

    return (
        <article className="post"
                 onContextMenu={(e) => {
                     e.preventDefault()
                     setEvent(e)
                     setHidden(false)
                     setPostId(id)
                 }} ref={ref}>
            <div className="post__header">
                <Avatar className="post__avatar" src={avatar}/>
                <div>
                    <p className="post__author-name">{name}</p>
                    <p className="post__pub-date">{timeDiffCalc(new Date(pub_date), new Date())} ago</p>
                </div>
            </div>
            <div className="post__inner">
                {!!text && <p>{text}</p>}
                {type === "image" && <img src={media_src} className="post__image" alt=""/>}
                {type === "audio" && <AppAudio src={media_src} id={id}/>}
                {/*{type === "audio" && <audio controls src={media_src} className="post__audio"/>}*/}
                {type === "video" && <video controls src={media_src} className="post__audio"/>}
            </div>
            <div className="post__stats">
                <div>
                    <div className="post__likes"
                         onClick={() => dispatch(SendReaction(id, "like"))}>{user_reaction === "like" ?
                        <AiFillLike size={"20px"}/> : <AiOutlineLike size={"20px"}/>}<span>{likes}</span></div>
                    <div className="post__dislikes"
                         onClick={() => dispatch(SendReaction(id, "dislike"))}>{user_reaction === "dislike" ?
                        <AiFillDislike size={"20px"}/> : <AiOutlineDislike size={"20px"}/>}<span>{dislikes}</span></div>
                    <div className="post__comments"><FaRegComments size={"20px"}/><span>{commentscount}</span></div>
                </div>
                <div className="post__views"><AiOutlineEye size={"20px"}/><span>{views}</span></div>
            </div>
            <PostComments comments={comments}/>
            <PostCommentForm postId={id}/>
        </article>
    )
})