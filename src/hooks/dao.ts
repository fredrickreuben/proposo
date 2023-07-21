import { useEffect, useState } from "react"
import useFirebase from "./firebase"
import { CollectionReference, DocumentData, WithFieldValue, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, DocumentSnapshot, QuerySnapshot, QueryDocumentSnapshot, SnapshotOptions, getFirestore } from "firebase/firestore"
import { IError } from "@proposo/interface/error"
import { FirebaseError } from "firebase/app"

interface IProp {
    name: string
}

const useDAO = <T>({ name }: IProp) => {

    const [cl, setCollection] = useState<CollectionReference<DocumentData, DocumentData>>()
    const [list, setList] = useState<T[]>()
    const [data, setData] = useState<T>()
    const [error, setError] = useState<IError>()

    const { DB } = useFirebase()

    const all = async (): Promise<T[] | undefined> => {

        if (!cl) return

        getDocs(cl).then(docs => {
            return docs.docs.map(e => ({ id: e.id, ...e.data() }))
        }).catch((error: FirebaseError | any) => {
            setError(state => ({
                ...state,
                message: error.message ? error.message : 'Oops! Something went wrong!',
                type: 'error',
                hasError: true
            }))
        })
    }

    const read = async (id: string): Promise<void> => {

        if (!cl) return

        const ref = doc(cl, id)

        getDoc(ref).then(res => {
            const _s = { id: res.id, ...res.data() } as T
            setData(_s)
        }).catch((error: FirebaseError | any) => {
            setError(state => ({
                ...state,
                message: error.message ? error.message : 'Oops! Something went wrong!',
                type: 'error',
                hasError: true
            }))
        })
    }

    const create = async (data: any, id?: string): Promise<void> => {

        if (!cl) return

        const ref = id ? doc(cl, id) : doc(cl)

        await setDoc(ref, data).then(async (res) => {
            await read(ref.id)
        }).catch((error: FirebaseError | any) => {
            setError(state => ({
                ...state,
                message: error.message ? error.message : 'Oops! Something went wrong!',
                type: 'error',
                hasError: true
            }))
        })
    }

    const update = async (data: WithFieldValue<DocumentData>, id: string): Promise<void> => {

        if (!cl) return

        const ref = doc(cl, id)

        updateDoc(ref, data).then(async () => {
            await read(ref.id)
        }).catch((error: FirebaseError | any) => {
            setError(state => ({
                ...state,
                message: error.message ? error.message : 'Oops! Something went wrong!',
                type: 'error',
                hasError: true
            }))
        })
    }

    const drop = async (id: string): Promise<boolean> => {

        if (!cl) return false

        const ref = doc(cl, id)

        return deleteDoc(ref).then(res => {
            return true
        }).catch((error: FirebaseError | any) => {
            setError(state => ({
                ...state,
                message: error.message ? error.message : 'Oops! Something went wrong!',
                type: 'error',
                hasError: true
            }))
            return false
        })
    }

    useEffect(() => {
        if (!DB) return
        const _c = collection(DB, name)
        setCollection(_c)
    }, [DB])

    return { data, list, error, all, read, create, update, drop }
}

export default useDAO