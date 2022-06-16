import {FieldProps, Form, Formik} from "formik"
import styles from "../styles.module.scss"
import classnames from "classnames"
import {FormComponentWithTitle} from "../FormComponentWithTitle"
import {Input} from "../../../common/components/Input"
import {Select} from "../../../common/components/Select"
import {Button} from "../../../common/components/Button"
import {useDispatch, useSelector} from "react-redux"
import {RegisterFormFields} from "../../../common/types/RegisterFormFields.type"
import {composeValidators} from "../../../utils/composeValidators"
import {required} from "../../../utils/validators/required"
import {maxLength} from "../../../utils/validators/maxLength"
import {minLength} from "../../../utils/validators/minLength"
import {email} from "../../../utils/validators/email"
import {PasswordInput} from "../PasswordInput"
import React, {useState} from "react"
import {PopUp} from "../../../common/components/PopUp"
import checkIcon from "../../../images/check-mark.svg"
import {RootState} from "../../../store/state"
import {registerUser} from "../../../store/thunk/auth"
import {HeaderActionCreators} from "../../../store/actionCreators/header"

interface IProps {
    visible: boolean
}

export const RegisterForm: React.FC<IProps> = React.memo(({visible, ...props}) => {
    const dispatch = useDispatch()
    const validateOtherFields = (value: string) => composeValidators(value, [required, minLength(2), maxLength(10)])
    const validatePasswordField = (value: string) => composeValidators(value, [required, minLength(5)])
    const validateEmailField = (value: string) => composeValidators(value, [required, email])
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false)

    const isTouched = useSelector((state: RootState) => state.headerReducer.isFormChanged)
    const [form, setForm] = useState<HTMLFormElement | null>(null)

    if (!visible) form?.classList.add(styles["register-form_invisible"])
    if (visible) form?.classList.remove(styles["register-form_invisible"])

    return (
        <>
            <PopUp className={styles["registration-succeed"]} visible={isRegistrationSuccessful} styles={{padding: "45px 130px"}}
                   onClose={() => setIsRegistrationSuccessful(false)}>
                <img src={checkIcon} alt="check icon"/>
                <h2>Your account<br/> was created successful.</h2>
                <Button filled className={styles["go-to-login"]} onClick={() => {
                    setIsRegistrationSuccessful(false)
                    dispatch(HeaderActionCreators.setForm("login"))
                }}>Login</Button>
            </PopUp>
            <Formik initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                gender: "male",
                password: ""
            } as RegisterFormFields} validate={(values) => {
                const errors: any = {}

                const FirstNameField = validateOtherFields(values["first_name"])
                const LastNameField = validateOtherFields(values["last_name"])
                const EmailField = validateEmailField(values["email"])
                const PasswordField = validatePasswordField(values["password"])

                if (FirstNameField) errors["first_name"] = FirstNameField
                if (LastNameField) errors["last_name"] = LastNameField
                if (EmailField) errors["email"] = EmailField
                if (PasswordField) errors["password"] = PasswordField

                return errors
            }} validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values, {setErrors}) => {
                        dispatch(registerUser(values, setErrors, () => setIsRegistrationSuccessful(true)))
                    }}>
                {() => {
                    return (
                        <Form {...props} ref={newRef => setForm(newRef)}
                              onAnimationEnd={(e) => {

                              }}
                              className={classnames(styles.form, styles["register-form"])}>
                            <div className={styles["login-form__column"]}>
                                <FormComponentWithTitle name="first_name" placeholder="Emanuel" title="First Name" Component={Input}/>
                                <FormComponentWithTitle name="email" title="E-mail" placeholder="admin@example.com" Component={Input}/>
                                <FormComponentWithTitle name="gender" title="Choose your gender" Component={
                                    (props: FieldProps<string, RegisterFormFields>) =>
                                        <Select {...props} defaultValue={props.form.values.gender}>
                                            {/*<option disabled value="bi-gendered">Bi-gendered</option>*/}
                                            {/*<option disabled value="dross-dresser">Cross-Dresser</option>*/}
                                            {/*<option disabled value="drag-queen">Drag Queen</option>*/}
                                            {/*<option disabled value="drag-king">Drag King</option>*/}
                                            {/*<option disabled value="femme-queen">Femme Queen</option>*/}
                                            {/*<option disabled value="female-to-male">Female-to-Male</option>*/}
                                            {/*<option disabled value="ftm">FTM</option>*/}
                                            {/*<option disabled value="gender-bender">Gender Bender</option>*/}
                                            {/*<option disabled value="transexual">Transexual</option>*/}
                                            {/*<option disabled value="trans-person">Trans Person</option>*/}
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            {/*<option disabled value="butch">Butch</option>*/}
                                            {/*<option disabled value="two-spirit">Two-Spirit</option>*/}
                                            {/*<option disabled value="trans">Trans</option>*/}
                                            {/*<option disabled value="agender">Agender</option>*/}
                                            {/*<option disabled value="third-sex">Third Sex</option>*/}
                                            {/*<option disabled value="gender-fluid">Gender Fluid</option>*/}
                                            {/*<option disabled value="non-binary-transgender">Non-Binary Transgender</option>*/}
                                            {/*<option disabled value="androgyne">Androgyne</option>*/}
                                            {/*<option disabled value="gender-gifted">Gender Gifted</option>*/}
                                            {/*<option disabled value="gender-blender">Gender Blender</option>*/}
                                            {/*<option disabled value="femme">Femme</option>*/}
                                            {/*<option disabled value="person-of-transgender-experience">Person of Transgender*/}
                                            {/*    Experience*/}
                                            {/*</option>*/}
                                            {/*<option disabled value="androgynous">Androgynous</option>*/}
                                        </Select>
                                }/>
                            </div>
                            <div className={styles["register-form__column"]}>
                                <FormComponentWithTitle name={"last_name"} title="Last Name" placeholder="Mangul" Component={Input}/>
                                <FormComponentWithTitle name={"password"} title="Password" placeholder="root123" type="password"
                                                        Component={PasswordInput}/>
                                <Button customStyles={{width: "100%", "marginTop": "auto"}}>Complete</Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
})