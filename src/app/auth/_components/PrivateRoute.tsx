import { getCookie, fetchVerifyRoute } from '@/libs/cookie'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

async function PrivateRoute({ children }:{ children: ReactNode }) {
    const user = await fetchVerifyRoute()

    if(!user) redirect('/')

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute