import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, getAuth, updatePassword } from "firebase/auth"
import { useEffect, useState } from "react"
import useFirebase from "./firebase"
import { IAuthScreen, IAuthState } from "@proposo/interface/auth"
import { FirebaseError } from "firebase/app"
import useDAO from "./dao"

const useAuth = () => {

    const { Auth } = useFirebase()

    const { data, create, } = useDAO({ name: 'profiles' })

    const [state, setState] = useState<IAuthState>({
        screen: IAuthScreen.NONE,
        auth: null,
        error: { message: '', type: '', hasError: false },
        loading: false
    })

    const getUseNameFromEmail = (email: string) => {

        const parts = email.split("@");
        if (parts.length > 0) {
            return parts[0];
        } else {
            return null;
        }
    }

    const setScreen = (screen: IAuthScreen) => {
        setState(state => ({
            ...state,
            screen
        }))
    }

    const setPassword = async (password: string) => {
        const auth = getAuth()
        if (!auth.currentUser) return
        await updatePassword(auth.currentUser, password)
    }

    const signIn = async (email: string, password: string) => {
        try {

            if (!Auth) return

            setState(state => ({
                ...state,
                error: { message: '', type: '', hasError: false },
                loading: true
            }))

            await signInWithEmailAndPassword(Auth, email, password);

        } catch (error: FirebaseError | any) {
            setState(state => ({
                ...state,
                loading: false,
                error: {
                    message: error.message ? error.message : 'Oops! Something went wrong!',
                    type: 'error',
                    hasError: true
                }
            }))
        } finally {
            setState(state => ({
                ...state,
                screen: IAuthScreen.NONE,
                loading: false,
            }))
        }
    }

    const signUp = async (email: string, password: string) => {
        try {
            if (!Auth) return

            setState(state => ({
                ...state,
                error: { message: '', type: '', hasError: false },
                loading: true,
            }))

            const res = await createUserWithEmailAndPassword(Auth, email, password);

            const auth = getAuth()

            if (!auth.currentUser) return

            const name = getUseNameFromEmail(email)

            if (!name) return

            await updateProfile(auth.currentUser, {
                displayName: name
            })

            await create({ uid: res.user.uid, displayName: res.user.displayName, email: res.user.email }, name)

        } catch (error: FirebaseError | any) {
            setState(state => ({
                ...state,
                loading: false,
                error: {
                    message: error.message ? error.message : 'Oops! Something went wrong!',
                    type: 'error',
                    hasError: true
                }
            }))
        } finally {
            setState(state => ({
                ...state,
                screen: IAuthScreen.NONE,
                loading: false,
            }))
        }
    }

    const logOut = async () => {
        try {
            if (!Auth) return

            await signOut(Auth)

            setState(state => ({
                ...state,
                auth: null,
                screen: IAuthScreen.NONE,
                error: { message: '', type: '', hasError: false },
                loading: false,
            }))

        } catch (error: FirebaseError | any) {
            setState(state => ({
                ...state,
                loading: false,
                error: {
                    message: error.message ? error.message : 'Oops! Something went wrong!',
                    type: 'error',
                    hasError: true
                }
            }))
        }
    }

    useEffect(() => {
        if (!Auth) return
        const unsubscribe = onAuthStateChanged(Auth, (user) => {
            setState(state => ({
                ...state,
                screen: user?.uid ? IAuthScreen.NONE : state.screen,
                auth: user?.uid ? {
                    user: user,
                    profile: null
                } : null,
                error: { message: '', type: '', hasError: false },
                loading: false,
            }))
        });

        return () => unsubscribe();

    }, [Auth])

    return { state, signIn, signUp, logOut, setPassword, setScreen }
}

export default useAuth