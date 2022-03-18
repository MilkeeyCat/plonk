import pStyles from "./styles.module.scss"
import React from "react"
import {FaTimes} from "react-icons/fa"
import classnames from "classnames"

interface IProps {
    className?: string,
    visible: boolean,
    onClose: () => void,
    title?: string,
    width?: string,
    styles?: React.CSSProperties
}

export const PopUp: React.FC<IProps> = ({visible, onClose, children, title, width, styles, className}) => {
    if (visible) document.body.classList.add("no-scroll")
    if (!visible) document.body.classList.remove("no-scroll")

    return (
        <div
            className={classnames(pStyles["pop-up"], {[pStyles["pop-up_visible"]]: visible}, {[className as string]: className})}>
            <div className={pStyles["pop-up__bg"]} onClick={onClose}/>
            <div className={pStyles["pop-up__inner"]} style={{maxWidth: width}}>
                <div className={pStyles["pop-up__header"]}>
                    {title ? <p className={pStyles["pop-up__title"]}>{title}</p> : false}
                    <FaTimes className={pStyles["pop-up__close-btn"]} onClick={onClose} size={"25px"}/>
                </div>
                <div className={pStyles["pop-up__text"]} style={styles}>
                    {children}
                </div>
            </div>
        </div>
    )
}