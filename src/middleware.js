import { NextResponse } from "next/server";
import { verifyToken } from "./app/utils/jwt";

export function middleware(req) {
  // try {
  //   if (req.nextUrl.pathname === "/auth/login") {
  //     return NextResponse.next();
  //   }

  //   const authHeader = req.headers.get("authorization");
  //   if (!authHeader) {
  //     console.warn("No Authorization header");
  //     return NextResponse.redirect(new URL("/auth/log-in", req.url));
  //   }

  //   const token = authHeader.split(" ")[1];
  //   if (!token) {
  //     console.warn("Invalid token");
  //     return NextResponse.redirect(new URL("/auth-log-in", req.url));
  //   }

  //   const decoded = verifyToken(token);
  //   if (!decoded) {
  //     console.warn("Invalid token");
  //     return NextResponse.redirect(new URL("/auth/log-in", req.url));
  //   }

  //   // Attach user data to request headers
  //   const response = NextResponse.next();
  //   response.headers.set("user-id", decoded.id); // You can set any field you need from decoded
  //   return response;
  // } catch (error) {
  //   console.error("Middleware error:", error);
  //   return NextResponse.redirect(new URL("/auth/log-in", req.url));
  // }

  // try {
  //   const { pathname } = req.nextUrl;

  //   // Allow access to the login page and public assets
  //   if (
  //     pathname === "/log-in" ||
  //     // pathname.startsWith("/api") ||
  //     pathname.startsWith("/_next") ||
  //     pathname === "/favicon.ico"
  //   ) {
  //     return NextResponse.next();
  //   }

  //   const cookieToken = req.cookies.get("token")?.value;

  //   if (!cookieToken) {
  //     return NextResponse.redirect(new URL("/log-in", req.url));
  //   }

  //   console.log(cookieToken);

  //   const decoded = verifyToken(cookieToken);
  //   if (!decoded) {
  //     console.warn("Invalid cookie token");
  //     return NextResponse.redirect(new URL("/log-in", req.url));
  //   }

  //   // Attach user data to request headers (optional)
  //   const response = NextResponse.next();
  //   response.headers.set("user-id", decoded.id); // Adjust field as needed
  //   return response;
  // } catch (error) {
  //   console.error("Middleware error:", error);
  //   return NextResponse.redirect(new URL("/log-in", req.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
