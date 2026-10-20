import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtUtils } from './utils/jwt';
const AUTH_ROUTES = ['/login', '/register'];
// const PUBLIC_ROUTES = ["/", '/login', '/register', '/news'];
const PUBLIC_ROUTES = ["/", '/news'];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // two way to get accessToken
    // 1.
    const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken");

    // 2.
    const accessToken = request.cookies.get("accessToken")?.value;

    const decodedToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    let userRole = null;
    if (!decodedToken?.success) {
        // token has expired or invalid, delete the accessToken cookie and redirect to login page
        cookieStore.delete('accessToken');
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (decodedToken?.success && decodedToken.data) {
        userRole = (decodedToken.data as JwtPayload).role;
    }
    // user is logged in and trying to access login or register page, redirect to dashboard or root home page
    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === 'USER') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        else if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }
        else if (userRole === 'AUTHOR') {
            return NextResponse.redirect(new URL('/author-dashboard', request.url))
        }
        else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
    // Authenticated Pages Protection: Authorization is not handled yet
    if (!accessToken && !isPublic && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    };


    // Authorization: Role based access control
    if (pathname.startsWith('/dashboard') && userRole !== 'USER') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if (pathname.startsWith('/author-dashboard') && userRole !== 'AUTHOR') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }

    // return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        // '/dashboard/:path*',
        // '/admin-dashboard/:path*'
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ]
}