'use client'

import ProfileAccount from '@proposo/components/profile/account'

interface IProps {
    params: { account: string }
}

const Account = ({ params }: IProps) => {
    
    const account = params.account

    return (
        <div className='max-w-4xl px-3 mx-auto'>
            <ProfileAccount account={account} />
        </div>
    )
}

export default Account
