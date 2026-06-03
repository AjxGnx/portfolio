import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const showNav = user && isAdminUser(user);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {showNav && (
        <div className="border-b border-border/50 bg-card/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin" className="text-muted hover:text-accent transition-colors">
                Dashboard
              </Link>
              <Link
                href="/admin/messages"
                className="text-muted hover:text-accent transition-colors"
              >
                Messages
              </Link>
              <Link
                href="/admin/content"
                className="text-muted hover:text-accent transition-colors"
              >
                Content
              </Link>
            </nav>
            <form action="/admin/logout" method="post">
              <button
                type="submit"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
