import styles from "./styles.module.scss"
import {FieldProps} from "formik"
import {RegisterFormFields} from "../../types/RegisterFormFields.type"
import infoIcon from "../../../images/info.svg"

interface IProps {
    className?: string,
    placeholder?: string
}

export const Input: React.FC<IProps & FieldProps<string, RegisterFormFields>> = ({form: {errors, touched}, field, form, ...props}) => {
    const error = field?.name in errors && errors[field?.name as keyof RegisterFormFields] !== undefined

    return (
    // @ts-ignore
        <div className={`${styles["input-container"]} ${field?.className ?? ""}`}>
            <input {...field} {...props} className={`${styles.input} ${error ? styles["input__error"] : ""}`} autoComplete="off"/>
            <img
                className={`${error ? styles["error-msg"] : styles["error-msg__hidden"]}`}
                src={infoIcon} alt="error icon" title={errors[field?.name as keyof RegisterFormFields]}/>
        </div>
    )
}