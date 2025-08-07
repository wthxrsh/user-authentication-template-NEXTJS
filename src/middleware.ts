import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";
    if(token && isPublicPath) {
        
        return NextResponse.redirect(new URL("/profile", request.url));

    } else if (!token && !isPublicPath) {

        return NextResponse.redirect(new URL("/login", request.url));

    }

    

}

export const config = {
    matcher: ["/login", "/signup", "/profile", "/", "/verifyemail"]
};