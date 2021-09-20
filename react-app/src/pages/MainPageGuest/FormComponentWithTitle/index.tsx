import {Field} from "formik"
import styles from "./styles.module.scss"

interface IProps {
    title: string,
    Component: React.ComponentType | string,
    className?: string,
}

export const FormComponentWithTitle: React.FC<IProps | {[key:string]: any}> = ({title, Component, className, ...props}) => {
    return(
        <div className={styles["form-element"]}>
            <label className={styles["form-element__title"]}>{title}</label>
            <Field className={styles["form-element__item"]} {...props} as={Component}/>
        </div>
    )
}