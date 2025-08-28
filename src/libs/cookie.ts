/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { cookies } from 'next/headers'
import { adminAuth } from './firebaseAdminConfig'



export async function setCookie(token:string) {
    const cookie = await cookies()

    cookie.set('__session__', token, {
        httpOnly: true,
        secure: true,
        // maxAge: 60 * 60,
        expires: new Date(Date.now() + 60 * 60 * 1000),
        sameSite: 'lax',
        path: '/',
    })
}

export async function getCookie() {
    const cookie = (await cookies()).get('__session__')?.value
    return cookie
}   


export async function clearCookie() {
    const cookie = await cookies()

    cookie.set('__session__', '', {
        httpOnly: true,
        secure: true,
        maxAge: 0,
        sameSite: 'lax',
        path: '/',
    })
}

export async function verifyToken(token:string) {
    const verify = await adminAuth.verifyIdToken(token)
    return verify
}



export async function fetchVerifyRoute() {
    const cookieHeader = await getCookie() as string
    // console.log('Cookie', cookieHeader)
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/verify`, {
            credentials: "include",
            next: { revalidate : 60 },
            headers: { 
                'Authorization': `Bearer ${cookieHeader}`, 
                'Content-Type': 'application/json',
            },
        })

        if(!res.ok || res.status === 401) {
            return null
        }

        const user = await res.json()
        return user
    } catch(e: any){
        console.log('Lỗi Authorization', e)
        return null
    }
}

