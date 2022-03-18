import {FaRegBell} from "react-icons/fa"
import "./styles.scss"

export const Notification = () => {
    return (
        <div className={"notification"}>
            <FaRegBell className={"notification__icon"} size={"25px"}/>
            <span className={"notification__count"}>2+</span>
        </div>
    )
}