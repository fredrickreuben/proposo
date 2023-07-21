'use client'

import Footer from '@proposo/partials/footer'
import Header from '@proposo/partials/header'
import React from 'react'

type Props = {
    children?: React.ReactNode
}

const MainTemplate = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main className="container py-16">{children}</main>
            <Footer />
        </>
    )
}

export default MainTemplate
