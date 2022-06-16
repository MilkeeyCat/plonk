import {Button} from "../../Button"
import {Avatar} from "../../Avatar"
import {RootState} from "../../../../store/state"
import {useDispatch, useSelector} from "react-redux"
import "./styles.scss"
import {Field, Form, Formik} from "formik"
import {composeValidators} from "../../../../utils/composeValidators"
import {required} from "../../../../utils/validators/required"
import {SendComment} from "../../../../store/thunk/post"

interface Props {
    postId: number
}

export const PostCommentForm: React.FC<Props> = ({postId}) => {
    const userAvatar = useSelector((state: RootState) => state.userReducer.user.avatar)
    const dispatch = useDispatch()

    const validateCommentField = (value: string) => composeValidators(value, [required])

    return (
        <Formik
            initialValues={{commentText: ""} as { commentText: string }}
            validate={(values) => {
                const errors: any = {}

                const CommentField = validateCommentField(values["commentText"])

                if (CommentField) errors["commentText"] = CommentField

                return errors
            }}
            onSubmit={(values, {resetForm}) => {
                dispatch(SendComment(values.commentText, postId, resetForm))
            }}>
            {() => {
                return (
                    <Form className="post-comment-form">
                        <Avatar src={userAvatar}/>
                        <Field name="commentText" as="input" placeholder="Write your no one needs comment. Do this."
                               className="post-comment-form__input"/>
                        <Button filled>Send</Button>
                    </Form>
                )
            }}
        </Formik>
        // <form action="#" className="post-comment-form">
        //     <Avatar src={userAvatar}/>
        //     <Input field={} form={}/>
        //     <Button>Send</Button>
        // </form>
    )
}