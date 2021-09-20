import {Form, Formik} from "formik"
import styles from "../styles.module.scss"
import classnames from "classnames"
import {FormComponentWithTitle} from "../FormComponentWithTitle"
import {Input} from "../Input"
import {Select} from "../Select"
import {Button} from "../../../common/components/Button"

interface IProps {
    hidden: boolean,
}

export const RegisterForm: React.FC<IProps> = ({hidden, ...props}) => {
    return (
        <Formik initialValues={{name: "", email: ""}} onSubmit={(values) => {
            console.log(values)
        }}>
            {() => {
                return (
                    <Form {...props}
                          className={classnames(styles.form, styles["register-form"], {[styles["hidden"]]: hidden})}>
                        <div className={styles["login-form__column"]}>
                            <FormComponentWithTitle name="name" title="First Name" Component={Input}/>
                            <FormComponentWithTitle name="email" title="E-mail" Component={Input}/>
                            <FormComponentWithTitle name="gender" title="Choose your gender" Component={
                                (props) =>
                                    <Select {...props}>
                                        <option disabled value="bi-gendered">Bi-gendered</option>
                                        <option disabled value="dross-dresser">Cross-Dresser</option>
                                        <option disabled value="drag-queen">Drag Queen</option>
                                        <option disabled value="drag-king">Drag King</option>
                                        <option disabled value="femme-queen">Femme Queen</option>
                                        <option disabled value="female-to-male">Female-to-Male</option>
                                        <option disabled value="ftm">FTM</option>
                                        <option disabled value="gender-bender">Gender Bender</option>
                                        <option disabled value="transexual">Transexual</option>
                                        <option disabled value="trans-person">Trans Person</option>
                                        <option value="woman">Woman</option>
                                        <option value="man">Man</option>
                                        <option disabled value="butch">Butch</option>
                                        <option disabled value="two-spirit">Two-Spirit</option>
                                        <option disabled value="trans">Trans</option>
                                        <option disabled value="agender">Agender</option>
                                        <option disabled value="third-sex">Third Sex</option>
                                        <option disabled value="gender-fluid">Gender Fluid</option>
                                        <option disabled value="non-binary-transgender">Non-Binary Transgender</option>
                                        <option disabled value="androgyne">Androgyne</option>
                                        <option disabled value="gender-gifted">Gender Gifted</option>
                                        <option disabled value="gender-blender">Gender Blender</option>
                                        <option disabled value="femme">Femme</option>
                                        <option disabled value="person-of-transgender-experience">Person of Transgender
                                            Experience
                                        </option>
                                        <option disabled value="androgynous">Androgynous</option>
                                    </Select>
                            }/>
                        </div>
                        <div className={styles["register-form__column"]}>
                            <FormComponentWithTitle title="Last Name" Component={Input}/>
                            <FormComponentWithTitle title="Password" type="password" Component={Input}/>
                            <Button customStyles={{width: "100%", "margin-top": "auto"}}>Complete</Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}