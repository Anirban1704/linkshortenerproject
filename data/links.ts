import { and, desc, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import { db } from "@/db";
import { shortLinks } from "@/db/schema";

const createShortCode = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyz",
  10,
);

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

export async function getShortLinkByShortCode(shortCode: string) {
  const result = await db
    .select({ url: shortLinks.url })
    .from(shortLinks)
    .where(eq(shortLinks.shortCode, shortCode))
    .limit(1);

  return result[0]?.url ?? null;
}

export async function createShortLink({
  clerkUserId,
  shortCode,
  url,
}: {
  clerkUserId: string;
  shortCode?: string;
  url: string;
}): Promise<{ success: false; error: string } | { success: true }> {
  const requestedShortCode = shortCode?.trim();
  let finalShortCode = requestedShortCode || createShortCode();

  if (requestedShortCode) {
    const existingLink = await db
      .select({ id: shortLinks.id })
      .from(shortLinks)
      .where(eq(shortLinks.shortCode, finalShortCode))
      .limit(1);

    if (existingLink.length > 0) {
      return {
        success: false as const,
        error: "That short code is already in use.",
      };
    }
  } else {
    while (true) {
      const existingLink = await db
        .select({ id: shortLinks.id })
        .from(shortLinks)
        .where(eq(shortLinks.shortCode, finalShortCode))
        .limit(1);

      if (existingLink.length === 0) {
        break;
      }

      finalShortCode = createShortCode();
    }
  }

  await db.insert(shortLinks).values({
    clerkUserId,
    shortCode: finalShortCode,
    url,
  });

  return { success: true as const };
}

export async function editShortLink({
  clerkUserId,
  id,
  shortCode,
  url,
}: {
  clerkUserId: string;
  id: number;
  shortCode?: string;
  url: string;
}): Promise<{ success: false; error: string } | { success: true }> {
  const requestedShortCode = shortCode?.trim();

  if (requestedShortCode) {
    const existingLink = await db
      .select({ id: shortLinks.id })
      .from(shortLinks)
      .where(
        and(
          eq(shortLinks.shortCode, requestedShortCode),
          eq(shortLinks.clerkUserId, clerkUserId),
        ),
      )
      .limit(1);

    if (existingLink.length > 0 && existingLink[0]?.id !== id) {
      return {
        success: false as const,
        error: "That short code is already in use.",
      };
    }
  }

  await db
    .update(shortLinks)
    .set({
      shortCode: requestedShortCode || "",
      url,
    })
    .where(and(eq(shortLinks.id, id), eq(shortLinks.clerkUserId, clerkUserId)));

  return { success: true as const };
}

export async function deleteShortLink({
  clerkUserId,
  id,
}: {
  clerkUserId: string;
  id: number;
}): Promise<{ success: false; error: string } | { success: true }> {
  await db
    .delete(shortLinks)
    .where(and(eq(shortLinks.id, id), eq(shortLinks.clerkUserId, clerkUserId)));

  return { success: true as const };
}
