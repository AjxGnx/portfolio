export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aliriogutierrez.com";

export const SITE_NAME = "Alirio Gutierrez";

export const DEFAULT_TITLE =
  "Alirio Gutierrez | Tech Lead & Senior Backend Developer";

export const DEFAULT_DESCRIPTION =
  "Tech Lead & Senior Backend Developer. Go, Python, Node.js — scalable microservices at Gipsyy, Rappi, and Platzi.";

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/projects",
  "/reading",
  "/gaming",
  "/contact",
] as const;

export const GOOGLE_SITE_VERIFICATION =
  "C4yMLGgtTFgIk0Mf-iVRGnU0i-aMVEy0gqXBIhBr1M8";

export const LOCALE_TO_OG: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  "pt-BR": "pt_BR",
};
