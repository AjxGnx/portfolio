import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import type { Database } from "@/lib/supabase/database.types";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

function isAdminRole(appMetadata: Record<string, unknown> | undefined): boolean {
  return appMetadata?.role === "admin";
}

function redirectWithSessionCookies(
  request: NextRequest,
  supabaseResponse: NextResponse,
  pathname: string,
  searchParams?: Record<string, string>
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value);
    }
  }
  const redirect = NextResponse.redirect(url, { status: 303 });
  supabaseResponse.cookies.getAll().forEach((cookie) =>
    redirect.cookies.set(cookie)
  );
  return redirect;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAdminRoute =
    pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isLoginRoute = pathname === "/admin/login";
  const isAdminArea = pathname.startsWith("/admin");

  // Handle admin routes with Supabase auth — skip intl middleware for admin
  if (isAdminArea) {
    let supabaseResponse = NextResponse.next({ request });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      return supabaseResponse;
    }

    const supabase = createServerClient<Database>(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (isAdminRoute) {
      if (!user) {
        return redirectWithSessionCookies(request, supabaseResponse, "/admin/login", {
          next: pathname,
        });
      }

      if (!isAdminRole(user.app_metadata as Record<string, unknown>)) {
        await supabase.auth.signOut();
        return redirectWithSessionCookies(request, supabaseResponse, "/admin/login", {
          error: "forbidden",
        });
      }
    }

    if (isLoginRoute && user && isAdminRole(user.app_metadata as Record<string, unknown>)) {
      return redirectWithSessionCookies(request, supabaseResponse, "/admin");
    }

    return supabaseResponse;
  }

  // Handle all public routes with next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static, _next/image  (Next.js internals)
     * - favicon.ico, opengraph-image (root-level assets)
     * - Files with static extensions: svg, png, jpg, jpeg, gif, webp, ico, txt, xml
     *   This covers: /robots.txt, /sitemap.xml, /llms.txt, /icon.svg, etc.
     */
    "/((?!_next/static|_next/image|favicon\\.ico|opengraph-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
