import "./styles.scss"
import classnames from "classnames"
import {FaSearch} from "react-icons/fa"

interface IProps {
    className?: string
}

export const Search: React.FC<IProps> = ({className}) => {
    return (
        <div className={classnames("search", {[className as string]: className})}>
            <FaSearch className="search__icon"/>
            <input className="search__input" type="text" placeholder="Search whatever you want"/>
        </div>
    )
}