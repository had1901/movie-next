import { clearCookie } from "@/libs/cookie"
import { adminAuth } from "@/libs/firebaseAdminConfig"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


export async function GET() {
    const tokenCookie = (await cookies()).get('session')?.value
    const tokenHeader = (await headers()).get('Authorization')?.split(" ")[1]
    
    const token = tokenCookie || tokenHeader
    
    if (!token) {
        return NextResponse.json({ error: tokenCookie, message: `Token ${tokenHeader}`  }, { status: 401 })
    }
    
    try{
        const decoded = await adminAuth.verifyIdToken(token)
        console.log('user-decode', decoded)
        return NextResponse.json({ 
            uid: decoded.uid, 
            email: decoded.email, 
            role: decoded.role,
            displayName: decoded.name,
            photoURL: decoded.picture,
            verifyEmail: decoded.email_verified 
        })
    }catch(e){
        console.log('Invalid token', e)
        await clearCookie()
    }
}