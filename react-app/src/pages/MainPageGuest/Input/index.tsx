import styles from "./styles.module.scss"

interface IProps {
    className?: string
}

export const Input: React.FC<IProps> = ({className, ...props}) => {

    return(
        <input className={`${styles.input} ${className}`}/>
    )
}