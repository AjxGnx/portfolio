import { markContactMessageRead, getContactMessages } from "@/lib/data/portfolio";
import { revalidatePath } from "next/cache";

async function markAsRead(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await markContactMessageRead(id);
  revalidatePath("/admin/messages");
}

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Contact messages</h1>
      <p className="text-muted text-sm mb-8">
        {messages.length} message{messages.length === 1 ? "" : "s"} total
      </p>

      {messages.length === 0 ? (
        <p className="text-muted text-sm glass rounded-2xl p-8 text-center">
          No messages yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`glass rounded-2xl p-6 ${msg.readAt ? "opacity-75" : "border-accent/20"}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <p className="font-semibold text-foreground">{msg.subject}</p>
                  <p className="text-sm text-muted">
                    {msg.name} ·{" "}
                    <a href={`mailto:${msg.email}`} className="hover:text-accent">
                      {msg.email}
                    </a>
                  </p>
                </div>
                <time className="text-xs text-muted whitespace-nowrap">
                  {new Date(msg.createdAt).toLocaleString()}
                </time>
              </div>
              <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap mb-4">
                {msg.message}
              </p>
              {!msg.readAt && (
                <form action={markAsRead}>
                  <input type="hidden" name="id" value={msg.id} />
                  <button
                    type="submit"
                    className="text-xs font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    Mark as read
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
