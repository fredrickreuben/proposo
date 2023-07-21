import { IFormProp } from '@proposo/interface/form'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import FormInputError from '../error'
import useError from '@proposo/hooks/error'

const RoundedFormInput = ({ id, name, label, type, placeholder, options }: IFormProp) => {

    const { show, message, getError } = useError()

    const {
        register,
        formState,
    } = useFormContext()

    useEffect(() => {
        getError(formState.errors, name)
    }, [formState])

    return (
        <div className="form-control w-full mb-3">
            <label htmlFor={id} className="label">
                <span className="label-text">{label}</span>
                <FormInputError show={show} message={message} />
            </label>
            <input autoComplete='off' id={id} type={type} placeholder={placeholder} className="input input-bordered input-secondary bg-slate-100 border-2 rounded-full w-full"  aria-invalid={show} {...register(name, options)} />
            <label className="label hidden">
                <span className="label-text-alt text-center">error</span>
            </label>
        </div>
    )
}

export default RoundedFormInput
