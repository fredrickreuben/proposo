'use client'

import { IAuthScreen } from '@proposo/interface/auth'
import { AuthContext } from '@proposo/providers/auth'
import Link from 'next/link'
import React, { useContext } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import Image from 'next/image'

const Header = () => {
    const authContext = useContext(AuthContext)

    const onLogin = () => {
        authContext.setScreen(IAuthScreen.LOGIN)
    }

    const onRegister = () => {
        authContext.setScreen(IAuthScreen.REGISTER)
    }

    const onSignOut = () => {
        authContext.signOut()
    }

    return (
        <div className="navbar bg-secondary shadow-md">
            <div className="container">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="flex items-center gap-2">
                    {authContext.state.auth ? (
                        <>
                            <button className="btn btn-ghost px-4 text-white hover:opacity-75 transition-all duration-200" onClick={onSignOut}>
                                LogOut
                            </button>
                            <Link href={`/${authContext.state.auth.user?.displayName}`}>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="relative w-10 rounded-full">
                                        {authContext.state.auth?.user?.photoURL ? (
                                            <Image src={authContext.state.auth?.user?.photoURL} alt={authContext.state.auth.user?.displayName ?? ''} />
                                        ) : (
                                            <MdAccountCircle className='text-5xl mx-auto absolute -top-1 bottom-0 right-0 -left-1' />
                                        )}
                                    </div>
                                </label>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center justify-center">
                            <button className="btn btn-ghost text-white" onClick={onLogin}>
                                Login
                            </button>
                            <button className="btn btn-accent rounded-full px-16 text-gray-100" onClick={onRegister}>
                                Get Started
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
