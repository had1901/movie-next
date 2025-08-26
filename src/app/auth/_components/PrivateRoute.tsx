import { getCookie, verifyRoute } from '@/libs/cookie'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

async function PrivateRoute({ children }:{ children: ReactNode }) {
    const cookieHeader = await getCookie() as string
    const user = await verifyRoute(cookieHeader)

    if(!user) redirect('/')

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute