import { unstable_cache } from "next/cache";
import { createHash } from "crypto";
import type { Locale } from "@/i18n/routing";

// Google Translate language codes
const GT_LOCALE_MAP: Record<string, string> = {
  es: "es",
  "pt-BR": "pt-BR",
};

const TTL_SECONDS = 60 * 60 * 24; // 24 hours

async function translateWithGoogle(
  text: string,
  targetLocale: string
): Promise<string> {
  const tl = GT_LOCALE_MAP[targetLocale];
  if (!tl) return text;

  const url =
    `https://translate.googleapis.com/translate_a/single` +
    `?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Google Translate HTTP ${res.status}`);

  // Response: [ [ ["translated", "original"], ... ], ... ]
  const data = (await res.json()) as Array<Array<[string, string]>>;
  return data[0].map((seg) => seg[0]).join("");
}

async function translateTexts(
  texts: string[],
  targetLocale: string
): Promise<string[]> {
  try {
    return await Promise.all(
      texts.map((text) => translateWithGoogle(text, targetLocale))
    );
  } catch (err) {
    console.error("[translate] Translation error:", err);
    return texts;
  }
}

function hashTexts(texts: string[], locale: string): string {
  return createHash("sha256")
    .update(`${locale}:${texts.join("\x00")}`)
    .digest("hex")
    .slice(0, 16);
}

/**
 * Translates specific string fields in a single object.
 * Returns original data unchanged if locale is 'en'.
 * Results are cached for 24 hours.
 */
export async function translateContent<T extends Record<string, unknown>>(
  data: T,
  fields: (keyof T & string)[],
  locale: Locale
): Promise<T> {
  if (locale === "en") return data;

  const textsToTranslate = fields
    .map((f) => (typeof data[f] === "string" ? (data[f] as string) : null))
    .filter((t): t is string => t !== null && t.trim().length > 0);

  if (textsToTranslate.length === 0) return data;

  const hash = hashTexts(textsToTranslate, locale);

  const translated = await unstable_cache(
    async () => translateTexts(textsToTranslate, locale),
    [`translate:${hash}`],
    { revalidate: TTL_SECONDS }
  )();

  const result = { ...data };
  let idx = 0;
  for (const field of fields) {
    if (
      typeof data[field] === "string" &&
      (data[field] as string).trim().length > 0
    ) {
      (result as Record<string, unknown>)[field] = translated[idx++];
    }
  }

  return result;
}

/**
 * Translates an array of objects, sending each text to Google Translate.
 * Returns original items unchanged if locale is 'en'.
 * Results are cached for 24 hours.
 */
export async function translateArray<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T & string)[],
  locale: Locale
): Promise<T[]> {
  if (locale === "en" || items.length === 0) return items;

  const textsToTranslate: string[] = [];
  const positions: Array<{ itemIdx: number; field: keyof T & string }> = [];

  for (let i = 0; i < items.length; i++) {
    for (const field of fields) {
      const val = items[i][field];
      if (typeof val === "string" && val.trim().length > 0) {
        textsToTranslate.push(val as string);
        positions.push({ itemIdx: i, field });
      }
    }
  }

  if (textsToTranslate.length === 0) return items;

  const hash = hashTexts(textsToTranslate, locale);

  const translated = await unstable_cache(
    async () => translateTexts(textsToTranslate, locale),
    [`translate-array:${hash}`],
    { revalidate: TTL_SECONDS }
  )();

  const results = items.map((item) => ({ ...item })) as T[];
  positions.forEach(({ itemIdx, field }, i) => {
    (results[itemIdx] as Record<string, unknown>)[field] = translated[i];
  });

  return results;
}
