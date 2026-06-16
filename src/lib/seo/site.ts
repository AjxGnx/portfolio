export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aliriogutierrez.com";

export const SITE_NAME = "Alirio Gutierrez";

export const DEFAULT_TITLE =
  "Alirio Gutierrez | Tech Lead & Senior Backend Developer";

export const DEFAULT_DESCRIPTION =
  "Tech Lead and Senior Backend Developer specializing in Go, Python, and Node.js. Building scalable microservices at Gipsyy, with experience at Rappi and Platzi.";

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/projects",
  "/reading",
  "/gaming",
  "/contact",
] as const;

export const SOCIAL = {
  github: "https://github.com/AjxGnx",
  linkedin: "https://www.linkedin.com/in/alirio-gutierrez-41a4a4197/",
  email: "alirio1925@gmail.com",
} as const;

export const OG_IMAGE = {
  url: "/hero.jpg",
  width: 471,
  height: 446,
  alt: "Alirio Gutierrez — Tech Lead & Senior Backend Developer",
} as const;
