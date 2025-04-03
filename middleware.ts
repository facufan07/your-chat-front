import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    if(url.pathname === "/"){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/"]
};