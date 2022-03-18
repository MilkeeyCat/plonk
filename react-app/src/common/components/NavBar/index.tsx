import classnames from "classnames"
import {NavLink} from "react-router-dom"
import "./style.scss"
import {HiOutlineHome} from "react-icons/hi"
import {BsChat} from "react-icons/bs"
import {FiUsers} from "react-icons/fi"
import {IoSettingsOutline} from "react-icons/io5"
import {GrGroup} from "react-icons/gr"

interface IProps {
    className?: string
}

export const NavBar: React.FC<IProps> = ({className}) => {
    return (
        <div className={classnames("nav", {[className as string]: className})}>
            <NavLink to={"/"} title="Home" exact className={"nav__item"} activeClassName={"nav__item_active"}><HiOutlineHome size={"20px"}/></NavLink>
            <NavLink to={"/chats"} title="Chats" className={"nav__item"} activeClassName={"nav__item_active"}><BsChat size={"20px"}/></NavLink>
            <NavLink to={"/friends"} title="Friends" className={"nav__item"} activeClassName={"nav__item_active"}><FiUsers size={"20px"}/></NavLink>
            <NavLink to={"/groups"} title="Groups" className={"nav__item"} activeClassName={"nav__item_active"}><svg width="20" height="20" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0703 11.5222H15.1126C14.8461 11.5222 14.5882 11.5622 14.3427 11.6359C13.8584 10.5886 12.8696 9.86906 11.7303 9.86906H8.26973C7.13039 9.86906 6.14164 10.5886 5.65734 11.6359C5.41184 11.5622 5.15387 11.5222 4.88742 11.5222H2.92969C1.31426 11.5222 0 12.9678 0 14.7448V18.1874C0 19.2536 0.788555 20.121 1.75781 20.121H18.2422C19.2114 20.121 20 19.2536 20 18.1874V14.7448C20 12.9678 18.6857 11.5222 17.0703 11.5222ZM5.34004 13.0918V18.832H1.75781C1.43473 18.832 1.17188 18.5428 1.17188 18.1874V14.7449C1.17188 13.6787 1.96043 12.8113 2.92969 12.8113H4.88742C5.04648 12.8113 5.20051 12.835 5.34715 12.8788C5.34293 12.9493 5.34004 13.0202 5.34004 13.0918ZM13.4881 18.832H6.51191V13.0918C6.51191 12.0256 7.30047 11.1582 8.26973 11.1582H11.7303C12.6995 11.1582 13.4881 12.0256 13.4881 13.0918V18.832ZM18.8281 18.1874C18.8281 18.5428 18.5653 18.832 18.2422 18.832H14.66V13.0918C14.66 13.0201 14.6571 12.9492 14.6529 12.8788C14.7995 12.835 14.9535 12.8112 15.1126 12.8112H17.0703C18.0396 12.8112 18.8281 13.6786 18.8281 14.7448V18.1874Z" fill="white"/>
                <path d="M3.90853 5.43572C2.47303 5.43572 1.30518 6.72035 1.30518 8.29941C1.30514 9.87847 2.47303 11.1631 3.90853 11.1631C5.344 11.1631 6.51189 9.87847 6.51189 8.29941C6.51189 6.72035 5.34404 5.43572 3.90853 5.43572ZM3.9085 9.87405C3.11916 9.87405 2.47701 9.16768 2.47701 8.29941C2.47701 7.43114 3.11916 6.72478 3.9085 6.72478C4.69783 6.72478 5.33998 7.43114 5.33998 8.29941C5.33998 9.16768 4.69783 9.87405 3.9085 9.87405Z" fill="white"/>
                <path d="M10 1.87898C8.08221 1.87898 6.52197 3.59524 6.52197 5.70483C6.52197 7.81442 8.08221 9.53068 10 9.53068C11.9178 9.53068 13.4781 7.81442 13.4781 5.70483C13.4781 3.59528 11.9178 1.87898 10 1.87898ZM10 8.24162C8.72838 8.24162 7.69385 7.10363 7.69385 5.70483C7.69385 4.30607 8.72838 3.16804 10 3.16804C11.2717 3.16804 12.3062 4.30602 12.3062 5.70483C12.3062 7.10363 11.2717 8.24162 10 8.24162Z" fill="white"/>
                <path d="M16.0914 5.43572C14.6559 5.43572 13.488 6.72035 13.488 8.29941C13.4881 9.87847 14.6559 11.1631 16.0914 11.1631C17.5269 11.1631 18.6948 9.87847 18.6948 8.29941C18.6948 6.72035 17.5269 5.43572 16.0914 5.43572ZM16.0914 9.87405C15.3021 9.87405 14.6599 9.16768 14.6599 8.29941C14.66 7.43114 15.3021 6.72478 16.0914 6.72478C16.8807 6.72478 17.5229 7.43114 17.5229 8.29941C17.5229 9.16768 16.8807 9.87405 16.0914 9.87405Z" fill="white"/>
            </svg>
            </NavLink>
            <NavLink to={"/settings"} title="Settings" className={"nav__item"} activeClassName={"nav__item_active"}><IoSettingsOutline size={"20px"}/></NavLink>
        </div>
    )
}