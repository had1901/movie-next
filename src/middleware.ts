import { NextRequest, NextResponse } from "next/server"


export async function middleware(req: NextRequest) {
    const tokenCookie = req.cookies.get('session')
    const tokenId = tokenCookie?.value
    // console.log('middleware', tokenId)

    if(!tokenId) {
      // console.log('Không có Token')
      return NextResponse.redirect(new URL("/not-found", req.url))
    }
    return NextResponse.next()
}
 

// Allow 'not' run on
export const config = {
  matcher: [
    "/auth/profile/:path*", 
    "/auth/favorite/:path*",
    "/auth/notification/:path*",
    "/auth/admin/:path*"
  ],
}