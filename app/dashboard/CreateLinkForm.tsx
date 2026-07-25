"use client";

import { useActionState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { createShortLinkAction, type CreateShortLinkState } from "./actions";

const initialState: CreateShortLinkState = {};

export function CreateLinkForm() {
  const [state, formAction, isPending] = useActionState(
    createShortLinkAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      const form = document.querySelector("form") as HTMLFormElement | null;
      form?.reset();
    }
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="url" className="text-sm font-medium text-zinc-200">
          Destination URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com"
          required
          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="shortCode"
          className="text-sm font-medium text-zinc-200"
        >
          Short code (optional)
        </label>
        <input
          id="shortCode"
          name="shortCode"
          type="text"
          placeholder="my-link"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-red-400">{state.error}</p>
      ) : null}

      {state.message ? (
        <p className="text-sm text-emerald-400">{state.message}</p>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Creating..." : "Create link"}
        </Button>
      </div>
    </form>
  );
}
