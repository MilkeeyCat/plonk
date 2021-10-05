import styles from "./styles.module.scss"
import React from "react"
import {library} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import classnames from "classnames"

library.add(faTimes)

interface IProps {
    className?: string,
    visible: boolean,
    onClose: () => void
}

export const PopUp: React.FC<IProps> = ({visible, onClose, children, className}) => {
    if (visible) document.body.classList.add("no-scroll")
    if (!visible) document.body.classList.remove("no-scroll")

    return (
        <div
            className={classnames(styles["pop-up"], {[styles["pop-up_visible"]]: visible}, {[className as string]: className})}>
            <div className={styles["pop-up__bg"]}/>
            <div className={styles["pop-up__inner"]}>
                <FontAwesomeIcon icon="times" className={styles["pop-up__close-btn"]} onClick={() => onClose()}/>
                <div className={styles["pop-up__text"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}