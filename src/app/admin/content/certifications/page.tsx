import { createClient } from "@/lib/supabase/server";
import { CertificationsClient } from "./_CertificationsClient";

export default async function CertificationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("id, name, issuer, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Certifications</h1>
        <p className="text-sm text-muted">Certificates and professional credentials.</p>
      </div>
      <CertificationsClient items={data ?? []} />
    </div>
  );
}
