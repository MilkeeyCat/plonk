import styles from "./styles.module.scss"
import infoIcon from "../../../../images/info-small.svg"
import React, {useState} from "react"

interface IProps {
    password: string,
    hidden: boolean
}

const strengthChecker = (password: string) => {

    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

    if(strongPassword.test(password)) {
        return "strength";
    } else if(mediumPassword.test(password)){
        return "medium";
    } else{
        return "weak";
    }
}

export const PasswordStrengthIndicator: React.FC<IProps> = React.memo(({password, hidden}) => {
    const strengths = {
        weak: 1,
        medium: 2,
        strength: 3,
    }
    const passwordStrength = strengthChecker(password)
    const [strength, setStrength] = useState(1)

    const reversed = strength - strengths[passwordStrength]

    console.log(reversed)
    if(strength !== strengths[passwordStrength]) setStrength(strengths[passwordStrength])


    return(
        <div className={`${styles["indicator"]} ${hidden ? styles["hidden"] : ""}`}>
            <div className={`${styles["indicator__container"]}`}>
                <div className={`${styles["indicator__item"]} ${styles[passwordStrength]}`}/>
                <div className={`${styles["indicator__item"]} ${strength > 1 ? `${styles[passwordStrength]} ${styles["indicator__item_active"]}` : ""}`}/>
                <div className={`${styles["indicator__item"]} ${strength > 2 ? styles[passwordStrength] : ""}`}/>
            </div>
            <p className={`${styles["indicator__text"]}`}>{passwordStrength[0].toUpperCase() + passwordStrength.substr(1)}<img src={infoIcon} alt="info icon" title="Your password is shitty"/></p>
        </div>
    )
})