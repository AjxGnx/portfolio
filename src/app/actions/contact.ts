"use server";

import { insertContactMessage } from "@/lib/data/portfolio";
import type { ContactMessageInput } from "@/lib/types/portfolio";

export async function submitContactMessage(
  input: ContactMessageInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!input.name?.trim() || !input.email?.trim() || !input.subject?.trim() || !input.message?.trim()) {
    return { ok: false, error: "All fields are required" };
  }

  if (input.name.trim().length > 200) {
    return { ok: false, error: "Name is too long (max 200 characters)" };
  }

  if (input.subject.trim().length > 300) {
    return { ok: false, error: "Subject is too long (max 300 characters)" };
  }

  if (input.message.trim().length > 5000) {
    return { ok: false, error: "Message is too long" };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(input.email.trim())) {
    return { ok: false, error: "Invalid email address" };
  }

  return insertContactMessage(input);
}
