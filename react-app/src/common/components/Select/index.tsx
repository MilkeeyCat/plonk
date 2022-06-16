import styles from "./styles.module.scss"

interface IProps {
    className?: string,
    defaultValue: string
}

export const Select: React.FC<IProps> = ({className, defaultValue, children}) => {
    return (
        <select defaultValue={defaultValue} className={`${styles.select} ${className}`}>
            {children}
        </select>
    )
}