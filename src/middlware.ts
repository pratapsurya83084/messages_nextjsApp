import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export {default} from 'next-auth/middleware';
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    const url = request.nextUrl;

if (token &&
    (
        url.pathname.startsWith('/sign-in') || //token existe then don't go this below route
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify') ||
        url.pathname.startsWith('/') 
)
) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
}


}

// See "Matching Paths" below to learn more
export const config = {
  // write here path if you want to use middlwre
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/dashboard/:path*", //all dashboard path
    "/verify/:path*",
  ],
};
