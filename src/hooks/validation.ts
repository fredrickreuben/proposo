import { useState } from "react"

const useValidation = () => {

    const [message, setMessage] = useState<string>('')

    const ValidatePassword = (password: string, passowrdConfirm: string) => {
        if (password != passowrdConfirm)
            setMessage('Do not match!')

        if (password.length < 8)
            setMessage('Too short!')

        if (!/[a-z]/.test(password))
            setMessage('No lowercase!')

        if (!/[A-Z]/.test(password))
            setMessage('No uppercase!')

        if (!/\d/.test(password))
            setMessage('No number!')
    }

    return { message, ValidatePassword }
}

export default useValidation