import { User, UserCredential } from "firebase/auth"
import { IError } from "./error"

export enum IAuthScreen {
    LOGIN,
    REGISTER,
    NONE
}

export interface IProfile{ 
    username: string,
    uuid: string,
    photo: string,
    description: string
}

export interface IAuth{
    user: User | null
    profile: IProfile | null
}

export interface IAuthState {
    screen: IAuthScreen,
    auth: IAuth | null,
    error: IError,
    loading: boolean
}

export interface IAuthContext {
    state: IAuthState,
    setScreen: (screen: IAuthScreen) => void
    signIn: (email: string, password: string) => void
    signUp: (email: string, password: string) => void
    signOut: () => void
}