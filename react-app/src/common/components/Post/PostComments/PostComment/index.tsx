import {Avatar} from "../../../Avatar"
import {timeDiffCalc} from "../../../../../utils/TimeDiffCalc"
import "./styles.scss"

interface Props {
    username: string,
    pub_date: Date,
    avatar: string,
    text: string
}

export const PostComment:React.FC<Props> = ({username, pub_date, avatar, text}) => {
    return (
        <div className="comment">
            <Avatar src={avatar}/>
            <section className="comment__right">
                <p className="comment__author">{username}</p>
                <span className="comment__pub-date">{timeDiffCalc(new Date(), new Date(pub_date))} ago</span>
                <p className="comment__text">{text}</p>
            </section>
        </div>
    )
}