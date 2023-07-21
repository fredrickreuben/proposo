import { useState } from "react"
import { FieldErrors, FieldValues } from "react-hook-form"

const useError = () => {
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)

    const getError = (errors: FieldErrors<FieldValues>, field: string) => {
        const error = errors[field]
        setShow(typeof error?.message === 'string')

        if (!error || !error?.message || typeof error.message != 'string') return
        setMessage(error.message)
    }

    return { message, show, getError }
}

export default useError