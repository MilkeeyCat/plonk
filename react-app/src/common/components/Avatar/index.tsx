import "./styles.scss"
import classnames from "classnames"


interface IProps {
    src: string | null,
    className?: string
}

export const Avatar: React.FC<IProps> = ({src, className}) => {
    return (
        <div className={classnames("avatar", {[className as string]: className})}>
            {
                src !== "" && src !== null ? <img src={src} className={"avatar__img"} alt="avatar"/>
                : <span className="avatar__default">A</span>
            }
        </div>
    )
}