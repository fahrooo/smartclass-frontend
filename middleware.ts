import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let hasId = request.cookies.has("_id");
  let hasIsLogin = request.cookies.has("isLogin");

  if (
    (request.nextUrl.pathname.startsWith("/dashboard") && !hasId) ||
    (request.nextUrl.pathname.startsWith("/dashboard") && !hasIsLogin) ||
    (request.nextUrl.pathname.startsWith("/users") && !hasId) ||
    (request.nextUrl.pathname.startsWith("/users") && !hasIsLogin) ||
    (request.nextUrl.pathname.startsWith("/area") && !hasId) ||
    (request.nextUrl.pathname.startsWith("/area") && !hasIsLogin) ||
    (request.nextUrl.pathname.startsWith("/device") && !hasId) ||
    (request.nextUrl.pathname.startsWith("/device") && !hasIsLogin) ||
    (request.nextUrl.pathname.startsWith("/settings") && !hasId) ||
    (request.nextUrl.pathname.startsWith("/settings") && !hasIsLogin) ||
    (request.nextUrl.pathname.startsWith("/home") && !hasId) ||
    (request.nextUrl.pathname.startsWith("/home") && !hasIsLogin) ||
    (request.nextUrl.pathname.startsWith("/booking") && !hasId) ||
    (request.nextUrl.pathname.startsWith("/booking") && !hasIsLogin)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  let id = request.cookies.get("_id")?.value;
  if (id) {
    const data =
      await 
      //   (await fetch(`https://qa-smartclass.pindad.co.id/be/me/${id}`)
      // ).json();
      (await fetch(`http://localhost:5000/me/${id}`)).json();

    if (
      (request.nextUrl.pathname == "/" &&
        hasId &&
        hasIsLogin &&
        data?.data?.role == "super admin") ||
      (request.nextUrl.pathname == "/registrasi" &&
        hasId &&
        hasIsLogin &&
        data?.data?.role == "super admin")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (
      (request.nextUrl.pathname == "/" &&
        hasId &&
        hasIsLogin &&
        data?.data?.role == "admin") ||
      (request.nextUrl.pathname == "/registrasi" &&
        hasId &&
        hasIsLogin &&
        data?.data?.role == "admin")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (
      (request.nextUrl.pathname == "/" &&
        hasId &&
        hasIsLogin &&
        data?.data?.role == "operator") ||
      (request.nextUrl.pathname == "/registrasi" &&
        hasId &&
        hasIsLogin &&
        data?.data?.role == "operator")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (
      (request.nextUrl.pathname == "/" &&
        hasId &&
        hasIsLogin &&
        data?.data?.role == "peserta") ||
      (request.nextUrl.pathname == "/registrasi" &&
        hasId &&
        hasIsLogin &&
        data?.data?.role == "peserta")
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    if (
      (request.nextUrl.pathname.startsWith("/users") &&
        data?.data?.role == "operator") ||
      (request.nextUrl.pathname.startsWith("/area") &&
        data?.data?.role == "operator") ||
      (request.nextUrl.pathname.startsWith("/device") &&
        data?.data?.role == "operator")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (
      (request.nextUrl.pathname.startsWith("/dashboard") &&
        data?.data?.role == "peserta") ||
      (request.nextUrl.pathname.startsWith("/users") &&
        data?.data?.role == "peserta") ||
      (request.nextUrl.pathname.startsWith("/area") &&
        data?.data?.role == "peserta") ||
      (request.nextUrl.pathname.startsWith("/device") &&
        data?.data?.role == "peserta")
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}
