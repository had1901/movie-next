import { NextRequest, NextResponse } from "next/server"


export async function middleware(req: NextRequest) {
    const tokenCookie = req.cookies.get('__session__')
    const tokenId = tokenCookie?.value
    if(!tokenId) {
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