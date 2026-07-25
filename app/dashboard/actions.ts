"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { createShortLink, deleteShortLink, editShortLink } from "@/data/links";

const createShortLinkSchema = z.object({
  url: z.string().trim().url("Please enter a valid URL."),
  shortCode: z
    .union([
      z
        .string()
        .trim()
        .max(32, "Short code must be 32 characters or fewer.")
        .regex(
          /^[a-zA-Z0-9-_]+$/,
          "Only letters, numbers, hyphens, and underscores are allowed.",
        ),
      z.literal(""),
    ])
    .optional(),
});

export type ShortLinkActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export type CreateShortLinkState = ShortLinkActionState;

export async function createShortLinkAction(
  prevState: CreateShortLinkState | null,
  formData: FormData,
): Promise<CreateShortLinkState> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "You must be signed in to create a short link." };
  }

  const validatedFields = createShortLinkSchema.safeParse({
    url: formData.get("url"),
    shortCode: formData.get("shortCode") ?? "",
  });

  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.flatten().fieldErrors.url?.[0] ??
        validatedFields.error.flatten().fieldErrors.shortCode?.[0] ??
        "Please review your form inputs.",
    };
  }

  const result = await createShortLink({
    clerkUserId: userId,
    url: validatedFields.data.url,
    shortCode: validatedFields.data.shortCode,
  });

  if ("error" in result) {
    return { error: result.error };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Your short link has been created.",
  };
}

const editShortLinkSchema = z.object({
  id: z.coerce.number().int().positive(),
  url: z.string().trim().url("Please enter a valid URL."),
  shortCode: z
    .union([
      z
        .string()
        .trim()
        .max(32, "Short code must be 32 characters or fewer.")
        .regex(
          /^[a-zA-Z0-9-_]+$/,
          "Only letters, numbers, hyphens, and underscores are allowed.",
        ),
      z.literal(""),
    ])
    .optional(),
});

export async function editShortLinkAction(
  prevState: ShortLinkActionState | null,
  formData: FormData,
): Promise<ShortLinkActionState> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "You must be signed in to update a short link." };
  }

  const validatedFields = editShortLinkSchema.safeParse({
    id: formData.get("id"),
    url: formData.get("url"),
    shortCode: formData.get("shortCode") ?? "",
  });

  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.flatten().fieldErrors.url?.[0] ??
        validatedFields.error.flatten().fieldErrors.shortCode?.[0] ??
        "Please review your form inputs.",
    };
  }

  const result = await editShortLink({
    clerkUserId: userId,
    id: validatedFields.data.id,
    url: validatedFields.data.url,
    shortCode: validatedFields.data.shortCode,
  });

  if ("error" in result) {
    return { error: result.error };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Your short link has been updated.",
  };
}

const deleteShortLinkSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function deleteShortLinkAction(
  prevState: ShortLinkActionState | null,
  formData: FormData,
): Promise<ShortLinkActionState> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "You must be signed in to delete a short link." };
  }

  const validatedFields = deleteShortLinkSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    return { error: "Please review your form inputs." };
  }

  const result = await deleteShortLink({
    clerkUserId: userId,
    id: validatedFields.data.id,
  });

  if ("error" in result) {
    return { error: result.error };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Your short link has been deleted.",
  };
}
