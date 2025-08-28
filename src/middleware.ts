import { NextRequest, NextResponse } from "next/server"


export async function middleware(req: NextRequest) {
    const tokenCookie = req.cookies.get('__session__')
    const tokenId = tokenCookie?.value
    console.log('token-mid', tokenId)
    if(!tokenId) {
      console.log('Không có Token')
      return NextResponse.redirect(new URL("/not-found", req.url))
    }
    return NextResponse.next()
}
 

// Allow 'not' run on
export const config = {
  matcher: [
    "/auth/profile/:path*", 
    "/auth/favorite/:path*",
    "/auth/admin/:path*"
  ],
}