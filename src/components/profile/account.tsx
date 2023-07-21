import useDAO from '@proposo/hooks/dao'
import React, { useEffect } from 'react'

interface IProp {
    account: string
}

const ProfileAccount = ({ account }: IProp) => {
    
    const { data, read } = useDAO<any>({ name: 'profiles' })

    useEffect(() => {
        read(account)
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return <div>Account</div>
}

export default ProfileAccount
