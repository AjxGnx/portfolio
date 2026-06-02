import ReadingClient from "@/app/reading/ReadingClient";
import { getBooks } from "@/lib/data/portfolio";

export default async function ReadingPage() {
  const books = await getBooks();
  return <ReadingClient books={books} />;
}
