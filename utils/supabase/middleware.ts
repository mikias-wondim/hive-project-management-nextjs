import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const publicPath = [
  "/",
  "/login",
  "/create-account",
  "/forgot-password",
  "/auth/callback",
  "/auth/reset-password",
  "/auth/auth-error",
  "/profile/:id",
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentPath = request.nextUrl.pathname;

  const nextPath =
    currentPath === "/login" || currentPath === "/create-account"
      ? request.nextUrl.searchParams.get("next") || "/" // Default to landing page
      : currentPath;

  // Check if the curernt path matches any public path pattern
  const isPublicPath = publicPath.some((path) => {
    const pattern = path.replace(":id", "[^/]+").replace("*", "[^/]*");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(currentPath);
  });

  if (!user && !isPublicPath) {
    // no user, redirect to login page with current path as next
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", nextPath);
    return NextResponse.redirect(url);
  }

  // If the user is not logged in and the current path is not public, redirect to the login page
  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", nextPath);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
