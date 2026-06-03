import Link from "next/link";
import { FileText, Inbox, Mail } from "lucide-react";
import { getUnreadMessageCount } from "@/lib/data/portfolio";

export default async function AdminDashboardPage() {
  const unreadCount = await getUnreadMessageCount();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Admin dashboard</h1>
      <p className="text-muted text-sm mb-8">
        Manage contact messages and portfolio content (CRUD UI coming soon).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
        <Link
          href="/admin/messages"
          className="glass rounded-2xl p-6 hover:border-accent/30 transition-colors group"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-accent/10 p-3">
              <Inbox className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                Contact messages
              </h2>
              <p className="text-sm text-muted mt-1">
                {unreadCount > 0
                  ? `${unreadCount} unread`
                  : "No unread messages"}
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/content"
          className="glass rounded-2xl p-6 hover:border-accent/30 transition-colors group"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-accent/10 p-3">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                Content editor
              </h2>
              <p className="text-sm text-muted mt-1">
                Manage skills, projects, experience and more
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
