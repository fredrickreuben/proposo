import '../assets/css/globals.css'

import { Quicksand } from 'next/font/google'
import { Metadata } from 'next'
import MainProvider from '@proposo/providers'

const quicksand = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        template: '%s | Blog App',
        default: 'This is a simple blog app.',
    },
    icons: {
        icon: '/icons/favicon.ico?v=4',
        shortcut: '/icons/apple-touch-icon.png',
        apple: '/icons/apple-touch-icon.png?v=4',
    },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" data-theme="light">
            <body className={quicksand.className}>
                <MainProvider>
                    {children}
                </MainProvider>
            </body>
        </html>
    )
}

export default RootLayout
