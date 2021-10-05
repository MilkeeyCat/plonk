import styles from "./style.module.scss"
import {Button} from "../Button"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../../store/state"
import {HeaderActionCreators} from "../../../store/actionCreators/header"

export const Header = () => {
    const currentButton = useSelector((state: RootState) => state.headerReducer.form)
    const dispatch = useDispatch()

    return (
        <header className={styles.header}>
            <div className={styles.logo}>Plonk<span>.</span></div>
            <div className={styles.buttons}>
                <Button filled={currentButton === "register"} onClick={() => {
                    dispatch(HeaderActionCreators.setForm("register"))
                    dispatch(HeaderActionCreators.setIsFormChanged(true))
                }}>Register</Button>
                <Button filled={currentButton === "login"} onClick={() => {
                    dispatch(HeaderActionCreators.setForm("login"))
                    dispatch(HeaderActionCreators.setIsFormChanged(true))
                }}>Login</Button>
            </div>
        </header>
    )
}