import {Field, FieldProps} from "formik"
import styles from "./styles.module.scss"
import {RegisterFormFields} from "../../../common/types/RegisterFormFields.type"

interface IProps {
    title: string,
    Component: React.ComponentType | string,
    className?: string,
    placeholder?: string
}

export const FormComponentWithTitle: React.FC<IProps | { [key: string]: any }> = ({title, Component, className, ...props}) => {
    return (
        <div className={styles["form-element"]}>
            <label className={styles["form-element__title"]}>{title}</label>
            {/*<Field {...props} hello={"LD"}>{(props: FieldProps<string, RegisterFormFields>) => {*/}
            {/*    return <Component className={styles["form-element__item"]} {...props}/>*/}
            {/*}}</Field>*/}
            <Field {...props} className={styles["form-element__item"]} component={Component}/>
        </div>
    )
}