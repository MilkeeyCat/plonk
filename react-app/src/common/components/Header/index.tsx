import styles from "./style.module.scss"
import {Button} from "../Button"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../../store/state"
import {HeaderActionCreators} from "../../../store/actionCreators/header"
import {Search} from "../Search"
import {NavBar} from "../NavBar"
import {Notification} from "../Notification"
import {Avatar} from "../Avatar"
import logo from "../../../images/logo.svg"

export const Header = () => {
    const currentButton = useSelector((state: RootState) => state.headerReducer.form)
    const isAuthed = useSelector((state: RootState) => state.userReducer.isAuthed)
    const {first_name, last_name, avatar} = useSelector((state: RootState) => state.userReducer.user)
    const dispatch = useDispatch()

    return (
        <header className={styles.header}>
            <img src={logo} alt="Logotype"/>
            {!isAuthed ?
                <div className={styles.buttons}>
                    <Button filled={currentButton === "register"} onClick={() => {
                        dispatch(HeaderActionCreators.setForm("register"))
                        dispatch(HeaderActionCreators.setIsFormChanged(true))
                    }}>Register</Button>
                    <Button filled={currentButton === "login"} onClick={() => {
                        dispatch(HeaderActionCreators.setForm("login"))
                        dispatch(HeaderActionCreators.setIsFormChanged(true))
                    }}>Login</Button>
                </div> :
                <>
                    <Search className={styles["header__search"]}/>
                    <NavBar className={styles["header__nav-bar"]}/>
                    <div className={styles["header__right"]}>
                        <Notification/>
                        <Avatar src={avatar} className={styles["header__right-avatar"]}/>
                        <span className={styles["header__right-name"]}>{`${first_name} ${last_name}`}</span>
                    </div>
                </>
            }
        </header>
    )
}