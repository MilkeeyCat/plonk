import {Form, Formik} from "formik"
import styles from "../styles.module.scss"
import classnames from "classnames"
import {FormComponentWithTitle} from "../FormComponentWithTitle"
import {Input} from "../Input"
import {Button} from "../../../common/components/Button"

interface IProps {
    hidden: boolean,
}

export const LoginForm: React.FC<IProps> = ({hidden, ...props}) => {
    return (
        <Formik initialValues={{name: "", email: ""}} onSubmit={(values) => {
            console.log(values)
        }}>
            {() => {
                return (
                    <Form {...props}
                          className={classnames(styles.form, styles["login-form"], {[styles["hidden"]]: hidden})}>
                        <div className={styles["login-form__column"]}>
                            <FormComponentWithTitle name="name" title="First Name" Component={Input}/>
                        </div>
                        <div className={styles["login-form__column"]}>
                            <FormComponentWithTitle name="name" title="First Name" Component={Input}/>
                        </div>
                        <Button className={styles["login-form__submit-btn"]}>Complete</Button>
                    </Form>
                )
            }}
        </Formik>
    )
}