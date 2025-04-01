import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    const isAuthenticated = await getAuthentication(req);

    console.log(isAuthenticated);

    if (isAuthenticated && (url.pathname === "/login" || url.pathname === "/")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if(!isAuthenticated && url.pathname !== "/login"){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}


async function getAuthentication(req: NextRequest) {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try{
        const response = await fetch(`${url}api/v1/auth/isAuth`, {
            method: 'GET',
            credentials: "include",
            headers:{
                "Cookie": req.headers.get("cookie") || "",
            }
        });

        if(response.ok){
            const responseText = await response.text();
            const isAuth = responseText === "true";
            return isAuth;
        }
        return false;
    }catch {
        return false;
    }
    
}

export const config = {
    matcher: ["/login", "/dashboard/:path*", "/"]
};