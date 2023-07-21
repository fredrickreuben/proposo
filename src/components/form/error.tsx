import { BiErrorCircle } from 'react-icons/bi'

interface IProp {
    show: boolean
    message: string
}

const FormInputError = ({show, message }: IProp) => {
    return (
        <>
            {show && (
                <span className="label-text-alt font-semibold text-xs flex gap-1 items-center text-error capitalize">
                    <BiErrorCircle className="font-bold" /> {message}
                </span>
            )}
        </>
    )
}

export default FormInputError
