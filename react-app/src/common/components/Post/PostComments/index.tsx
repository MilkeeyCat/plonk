import {PostComment} from "./PostComment"
import {Comment} from "../../../types/Comment"
import "./styles.scss"

interface Props {
    comments: Comment[]
}

export const PostComments: React.FC<Props> = ({comments}) => {
    return (
        <section className="post-comments">
            {comments.map((comment) => {
                return (
                    <PostComment username={comment.name} pub_date={comment.pub_date}
                                 avatar={comment.avatar} text={comment.text}/>
                )
            })}
        </section>
    )
}