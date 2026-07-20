import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { shortLinks } from "@/db/schema";

export async function getUserShortLinks(clerkUserId: string) {
  return db
    .select({
      id: shortLinks.id,
      shortCode: shortLinks.shortCode,
      url: shortLinks.url,
      createdAt: shortLinks.createdAt,
    })
    .from(shortLinks)
    .where(eq(shortLinks.clerkUserId, clerkUserId))
    .orderBy(desc(shortLinks.createdAt));
}
