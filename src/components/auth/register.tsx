'use client'

import React, { Fragment, useContext } from 'react'
import { AuthContext } from '@proposo/providers/auth'
import { Dialog, Transition } from '@headlessui/react'
import { IoMdClose } from 'react-icons/io'
import { IAuthScreen } from '@proposo/interface/auth'
import { IRegisterFormInput } from '@proposo/interface/form'
import { useForm, FormProvider } from 'react-hook-form'
import RoundedFormInput from '../form/rounded/input'
import Button from '../elements/button'
import Alert from '../elements/alert'

const RegisterDialog = () => {
    const methods = useForm<IRegisterFormInput>()

    const authContext = useContext(AuthContext)

    const onLogin = () => {
        authContext.setScreen(IAuthScreen.LOGIN)
    }

    const onClose = () => {
        authContext.setScreen(IAuthScreen.NONE)
    }

    const onSubmit = (data: IRegisterFormInput) => {
        authContext.signUp(data.email, data.password)
    }

    return (
        <Transition appear show={authContext.state.screen == IAuthScreen.REGISTER} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => authContext.setScreen(IAuthScreen.NONE)}>
                <Transition.Child as={Fragment} enter="ease-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title>
                                    <button className="btn btn-circle absolute right-2 top-2 btn-sm" onClick={onClose}>
                                        <IoMdClose className="text-gray-300 hover:text-gray-500 transition-all duration-300 p-0.5 bg-white h-6 w-6 rounded-full" />
                                    </button>
                                    <h3 className="text-5xl text-start font-bold my-4">Register</h3>
                                </Dialog.Title>
                                <Dialog.Description>
                                    
                                    <Alert title={authContext.state.error.message} show={authContext.state.error.hasError} type={authContext.state.error.type} />
                                    
                                    <FormProvider {...methods}>
                                        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off" noValidate>
                                            <RoundedFormInput
                                                id="email"
                                                label="What is your email?"
                                                name="email"
                                                type="email"
                                                placeholder="Type here..."
                                                options={{
                                                    required: 'Required field!',
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message: 'Invalid email!',
                                                    },
                                                }}
                                            />
                                            <RoundedFormInput
                                                id="password"
                                                label="What is your password?"
                                                name="password"
                                                type="password"
                                                placeholder="Type here..."
                                                options={{
                                                    required: 'Required field!',
                                                    validate: {
                                                        short: v => v.length > 8 || 'Too short!',
                                                        number: v => /[0-9]/.test(v) || 'Include Interger!',
                                                        uppercase: v => /[A-Z]/.test(v) || 'Include Lowercase!',
                                                        lowercase: v => /[a-z]/.test(v) || 'Include Uppercase!',
                                                    },
                                                }}
                                            />

                                            <RoundedFormInput
                                                id="comfirmPassword"
                                                label="What is your password?"
                                                name="comfirmPassword"
                                                type="password"
                                                placeholder="Type here..."
                                                options={{
                                                    required: 'Required field!',
                                                    validate: {
                                                        short: v => v.length > 8 || 'Too short!',
                                                        number: v => /[0-9]/.test(v) || 'Include Interger!',
                                                        uppercase: v => /[A-Z]/.test(v) || 'Include Lowercase!',
                                                        lowercase: v => /[a-z]/.test(v) || 'Include Uppercase!',
                                                        confirm: v => methods.watch('password') == v || 'Do not match!',
                                                    },
                                                }}
                                            />

                                            <div className="modal-action mt-10 mb-10">
                                                <div className="justify-center w-full">
                                                    <Button title="Register" loading={authContext.state.loading} className="btn btn-secondary rounded-full px-14" />
                                                </div>
                                                <div className="justify-end">
                                                    <button type="button" className="btn btn-ghost px-4" onClick={onLogin}>
                                                        Login
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </FormProvider>
                                </Dialog.Description>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default RegisterDialog
