import { useEffect, useState } from "react"
import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { firebase } from "@proposo/config/firebase";
import { getFirestore, Firestore } from "firebase/firestore";

const useFirebase = () => {

    const [Instance, setInstance] = useState<FirebaseApp>()
    const [DB, setDB] = useState<Firestore>()
    const [Auth, setAuth] = useState<Auth>()

    useEffect(() => {
        const app = initializeApp(firebase)
        setInstance(app)
    }, [])

    useEffect(() => {
        if (!Instance) return
        const auth = getAuth(Instance)
        setAuth(auth)
    }, [Instance])

    useEffect(() => {
        if (!Instance) return
        const db = getFirestore(Instance)
        setDB(db)
    }, [Instance])

    return { Auth, DB }
}

export default useFirebase