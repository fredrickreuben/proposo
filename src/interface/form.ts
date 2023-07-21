import {FieldValues, RegisterOptions } from "react-hook-form"

export interface ILoginFormInput {
    email: string,
    password: string,
}

export interface IRegisterFormInput {
    email: string,
    password: string,
    passwordConfirm: string
}

export interface IFormProp {
    label: string, type: string, id: string, name: string, placeholder: string, options?: RegisterOptions<FieldValues, string>
}