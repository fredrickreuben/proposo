'use client'

import useAuth from '@proposo/hooks/auth'
import { IAuthContext, IAuthScreen } from '@proposo/interface/auth'
import { ReactNode, createContext } from 'react'

interface IProp {
    children: ReactNode
}

const AuthContext = createContext<IAuthContext>({
    state: { screen: IAuthScreen.NONE, auth: undefined, error: {message: '', type: '', hasError: false}, loading: false },
    setScreen: () => {},
    signIn: () => {},
    signUp: () => {},
    signOut: () => {},
})

const AuthProvider = ({ children }: IProp) => {
    const { state, signIn, signUp, logOut, setScreen } = useAuth()

    return <AuthContext.Provider value={{ state, setScreen, signIn, signUp, signOut: logOut }}>{children}</AuthContext.Provider>
}

export { AuthContext }

export default AuthProvider
