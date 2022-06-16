import {Post} from "../../types/Post"
import {AppPost} from "../Post"
import classnames from "classnames"
import {BsPencil} from "react-icons/bs"
import {FiTrash2} from "react-icons/fi"
import {MdContentCopy} from "react-icons/md"
import "./styles.scss"
import {useState} from "react"
import {DeletePost} from "../../../store/thunk/post"
import {useDispatch} from "react-redux"

interface Props {
    posts: Post[]
}

export const Posts: React.FC<Props> = ({posts}) => {
    const [hidden, setHidden] = useState(true)
    const [event, setEvent] = useState<React.MouseEvent>()
    const [postId, setPostId] = useState<number>()
    const dispatch = useDispatch()

    if (!hidden) {
        document.body.classList.add("no-scroll")
    } else {
        document.body.classList.remove("no-scroll")
    }

    return (
        <section className="posts">
            <div className="posts__inner">
                {posts.map(post => <AppPost setEvent={setEvent} setPostId={setPostId} setHidden={setHidden} {...post}/>)}
            </div>
            <ul
                onContextMenu={(e) => e.preventDefault()}
                style={{top: event?.clientY, left: event?.clientX}}
                className={classnames(["post-contextmenu", {"post-contextmenu__hidden": hidden}])}>
                <li className="post-contextmenu__item"><MdContentCopy className="post-contextmenu__item-icon" size={"20px"}/> Copy Text</li>
                <li className="post-contextmenu__item"><BsPencil className="post-contextmenu__item-icon" size={"20px"}/> Edit</li>
                <li className="post-contextmenu__item" onClick={() => !!postId && dispatch(DeletePost(postId))} ><FiTrash2 className="post-contextmenu__item-icon" size={"20px"}/> Delete</li>
            </ul>
            {!hidden &&
            <div className="post-overlay"
                 onClick={(e) => {
                     setEvent(e)
                     setHidden(true)
                 }}
                 onContextMenu={(e) => {
                     e.preventDefault()
                     setEvent(e)
                     setHidden(false)
                 }}
            />}
        </section>
    )
}