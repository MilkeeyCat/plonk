import styles from "./styles.module.scss"
import {FieldProps} from "formik"
import {RegisterFormFields} from "../../../common/types/RegisterFormFields.type"
import infoIcon from "../../../images/info.svg"

interface IProps {
    className?: string
}

export const Input: React.FC<IProps & FieldProps<string, RegisterFormFields>> = ({className, form: {errors, touched}, field, meta, ...props}) => {
    console.log(errors)
    return (
        <div className={`${styles["input-container"]} ${className ?? ""}`}>
            <input {...field} className={`${styles.input} ${meta.error ? "error" : ""}`} autoComplete="off"/>
            <img
                className={`${field?.name in errors && errors[field?.name as keyof RegisterFormFields] !== undefined ? styles["error-msg"] : styles["error-msg__hidden"]}`}
                src={infoIcon} alt="error icon" title={errors[field?.name as keyof RegisterFormFields]}/>
        </div>
    )
}