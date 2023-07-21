'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import store from '@proposo/domain/store'
import React from 'react'
import { Provider } from 'react-redux'
import AuthProvider from './auth'

const MainProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <CacheProvider>
            <ChakraProvider>
                <Provider store={store}>
                    <AuthProvider>{children}</AuthProvider>
                </Provider>
            </ChakraProvider>
        </CacheProvider>
    )
}

export default MainProvider
