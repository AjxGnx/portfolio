import ReadingClient from "@/app/[locale]/reading/ReadingClient";
import { getBooks } from "@/lib/data/portfolio";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ReadingPage({ params }: Props) {
  const { locale } = await params;
  const books = await getBooks(locale as Locale);
  return <ReadingClient books={books} />;
}
