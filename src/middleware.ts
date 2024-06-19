import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
    "/dashboard",
    "/dashboard/change-password",
    "/doctors",
];
const roleBasedPrivateRoutes = {
    PATIENT: [/^\/dashboard\/patient/],
    DOCTOR: [/^\/dashboard\/doctor/],
    ADMIN: [/^\/dashboard\/admin/],
    SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
        if (
            AuthRoutes.includes(pathname) ||
            commonPrivateRoutes.includes(pathname)
        ) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (
        accessToken &&
        (commonPrivateRoutes.includes(pathname) ||
            commonPrivateRoutes.some((route) => pathname.startsWith(route)))
    ) {
        return NextResponse.next();
    }

    let decodedData = null;
    if (accessToken) {
        decodedData = jwtDecode(accessToken) as any;
    }
    const role = decodedData?.role;

    // if (
    //     accessToken &&
    //     role === "ADMIN" &&
    //     pathname.startsWith("/dashboard/admin")
    // ) {
    //     return NextResponse.next();
    // }

    if (role && roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.redirect(new URL("/dashboard", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/login", "/register", "/dashboard/:page*", "/doctors/:page*"],
};
