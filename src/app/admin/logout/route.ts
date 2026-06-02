import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const loginUrl = new URL(request.url);
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";

  return NextResponse.redirect(loginUrl, { status: 303 });
}
