import {Input} from "../../../common/components/Input"
import {FieldProps, FormikTouched} from "formik"
import {RegisterFormFields} from "../../../common/types/RegisterFormFields.type"
import {PasswordStrengthIndicator} from "./PasswordStrengthIndicator"
import React from "react"

interface IProps {

}

export const PasswordInput: React.FC<IProps & FieldProps<string, RegisterFormFields>> = React.memo((props) => {
    const passwd = props.form.values.password

    return (
        <div>
            <Input {...props}/>
            <PasswordStrengthIndicator hidden={!passwd} password={passwd}/>
        </div>
    )
})