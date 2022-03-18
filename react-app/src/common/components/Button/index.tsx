import styles from "./styles.module.scss"
import classnames from "classnames"

interface IProps {
    filled?: boolean,
    customStyles?: { [key: string]: string },
    className?: string,
    animated?: boolean,
    type?: string
}

export const Button: React.FC<IProps | { [key: string]: any }> = ({filled, customStyles, className, type, animated, ...props}) => {
    return (
        <button {...props} type={type ?? ""} style={customStyles ?? {}}
                className={classnames(className, styles.button, {[styles["filled"]]: filled}, {[styles["animated"]]: animated})}>{props.children}</button>
    )
}