import {Form, Formik} from "formik"
import styles from "../styles.module.scss"
import classnames from "classnames"
import {FormComponentWithTitle} from "../FormComponentWithTitle"
import {Input} from "../../../common/components/Input"
import {Button} from "../../../common/components/Button"
import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../../store/state"
import {composeValidators} from "../../../utils/composeValidators"
import {required} from "../../../utils/validators/required"
import {minLength} from "../../../utils/validators/minLength"
import {email} from "../../../utils/validators/email"
import {LoginFormFields} from "../../../common/types/LoginFormFields.type"
import {loginUser} from "../../../store/thunk/auth"

interface IProps {
    visible: boolean,
}

export const LoginForm: React.FC<IProps> = ({visible, ...props}) => {
    const [form, setForm] = useState<HTMLFormElement | null>(null)
    const isTouched = useSelector((state: RootState) => state.headerReducer.isFormChanged)
    const dispatch = useDispatch()

    const validatePasswordField = (value: string) => composeValidators(value, [required, minLength(5)])
    const validateEmailField = (value: string) => composeValidators(value, [required, email])

    if (!visible) form?.classList.add(styles["login-form_invisible"])
    if (visible) form?.classList.remove(styles["login-form_invisible"])

    return (
        <Formik initialValues={{email: "", password: ""} as LoginFormFields} validate={(values) => {
            const errors: any = {}

            const EmailField = validateEmailField(values["email"])
            const PasswordField = validatePasswordField(values["password"])

            if (EmailField) errors["email"] = EmailField
            if (PasswordField) errors["password"] = PasswordField

            return errors
        }}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, {setErrors}) => {
                    dispatch(loginUser(values, setErrors))
                }}>
            {() => {
                return (
                    <Form {...props} ref={newRef => setForm(newRef)} onAnimationEnd={(e) => {}}
                          className={classnames(styles.form, styles["login-form"])}>
                        <div className={styles["login-form__column"]}>
                            <FormComponentWithTitle name="email" title="Email or Username" placeholder="admin@example.com" Component={Input}/>
                        </div>
                        <div className={styles["login-form__column"]}>
                            <FormComponentWithTitle name="password" title="Password" placeholder="root123" Component={Input}/>
                        </div>
                        <Button className={styles["login-form__submit-btn"]}>Complete</Button>
                    </Form>
                )
            }}
        </Formik>
    )
}