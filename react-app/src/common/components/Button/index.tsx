import styles from "./style.module.scss"
import classnames from "classnames"

interface IProps {
    filled?: boolean,
    customStyles?: {[key: string]: string},
    className?: string
}

export const Button:React.FC<IProps | {[key:string]: any}> = ({filled, customStyles, className, ...props}) => {
    return(
        <button {...props} style={customStyles ?? {}} className={classnames(className, styles.button, {[styles["filled"]]: filled})}>{props.children}</button>
    )
}