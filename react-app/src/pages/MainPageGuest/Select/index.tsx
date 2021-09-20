import styles from "./styles.module.scss"

interface IProps {
    className?: string
}

export const Select: React.FC<IProps> = ({className, children}) => {
    return (
        <select className={`${styles.select} ${className}`}>
            {children}
        </select>
    )
}