import React, { ButtonHTMLAttributes } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    loading: boolean
}

const Button = (props: IProps) => {
    return (
        <button {...props} disabled={props.loading}>
            <span className='flex gap-2'>
                <span>
                    {props.title}
                </span>
                {props.loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            </span>
        </button>
    )
}

export default Button
