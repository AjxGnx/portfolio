import { revalidatePath } from "next/cache";

/**
 * Revalidates all public-facing portfolio pages so that cached RSC output
 * is invalidated after any content mutation in the admin area.
 */
export function revalidatePortfolioContent() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/projects");
  revalidatePath("/reading");
  revalidatePath("/gaming");
  revalidatePath("/llms.txt");
}
