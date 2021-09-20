import {LoginForm} from "./LoginForm"
import {RegisterForm} from "./RegisterForm"
import {useSelector} from "react-redux"
import {RootState} from "../../store/state"
import styles from "./styles.module.scss"



export const MainPageGuest: React.FC = () => {
    const currentForm = useSelector((state: RootState) => state.headerReducer.form)

    return (
        <div>
            <LoginForm hidden={currentForm !== "login"}/>
            <RegisterForm hidden={currentForm !== "register"}/>

            <h2 className={styles["block-title"]}>The reasons why you want to register in this social network</h2>
            <div className={styles.reasons}>
                <div className={styles["reasons__item"]}>
                    <img src="/images/support.png" alt="image"/>
                    <p className={styles["reasons__text"]}>Caesiums sunt rumors de magnum absolutio.</p>
                </div>
                <div className={styles["reasons__item"]}>
                    <img src="/images/support.png" alt="image"/>
                    <p className={styles["reasons__text"]}>Caesiums  dfg dfg sdfgsdfg df gsd fgsdfg rumors de magnum absolutio.</p>
                </div>
                <div className={styles["reasons__item"]}>
                    <img src="/images/support.png" alt="image"/>
                    <p className={styles["reasons__text"]}>Caesiums sunt  dfg sdf gs dfg dg de magnum absolutio.</p>
                </div>
                <div className={styles["reasons__item"]}>
                    <img src="/images/support.png" alt="image"/>
                    <p className={styles["reasons__text"]}>Caesiums adsad a sasd af sdf stg fdg nt rumors de magnum absolutio.</p>
                </div>
                <div className={styles["reasons__item"]}>
                    <img src="/images/support.png" alt="image"/>
                    <p className={styles["reasons__text"]}>Caesiums sunt rumors de magnum absolutio.</p>
                </div>
                <div className={styles["reasons__item"]}>
                    <img src="/images/support.png" alt="image"/>
                    <p className={styles["reasons__text"]}>Caesiums sunt rumors de magnum absolutio.</p>
                </div>
            </div>
        </div>
    )
}