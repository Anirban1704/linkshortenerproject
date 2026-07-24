"use client";

import { useActionState, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { deleteShortLinkAction, editShortLinkAction, type ShortLinkActionState } from "./actions";

type LinkListItemProps = {
  link: {
    id: number;
    shortCode: string;
    url: string;
    createdAt: Date | string | null | undefined;
  };
};

const initialState: ShortLinkActionState = {};

function formatDate(value: Date | string | null | undefined) {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function LinkListItem({ link }: LinkListItemProps) {
  const [editState, editAction, editPending] = useActionState(editShortLinkAction, initialState);
  const [deleteState, deleteAction, deletePending] = useActionState(deleteShortLinkAction, initialState);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditSubmit = () => {
    setIsEditOpen(false);
  };

  const handleDeleteSubmit = () => {
    setIsDeleteOpen(false);
  };

  return (
    <li className="rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.18)] transition hover:border-zinc-700 hover:bg-zinc-950">
      <div className="flex flex-col items-center text-center gap-6">
        <div className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          /{link.shortCode}
        </div>
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="break-all text-lg font-semibold text-zinc-50 transition hover:text-zinc-100"
        >
          {link.url}
        </a>
        <p className="text-sm text-zinc-500">Created {formatDate(link.createdAt)}</p>

        <div className="flex flex-wrap justify-center gap-3">
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-sm")}
            >
              Edit
            </DialogTrigger>
            <DialogContent>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle>Edit short link</DialogTitle>
                  <DialogDescription>
                    Update the destination URL or short code for this link.
                  </DialogDescription>
                </div>
                <DialogCloseButton />
              </div>

              <form
                action={(formData) => {
                  editAction(formData);
                  handleEditSubmit();
                }}
                className="mt-6 space-y-4"
              >
                <input type="hidden" name="id" value={link.id} />

                <div className="space-y-2">
                  <label htmlFor={`edit-url-${link.id}`} className="text-sm font-medium text-zinc-200">
                    Destination URL
                  </label>
                  <input
                    id={`edit-url-${link.id}`}
                    name="url"
                    type="url"
                    defaultValue={link.url}
                    required
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={`edit-short-code-${link.id}`} className="text-sm font-medium text-zinc-200">
                    Short code (optional)
                  </label>
                  <input
                    id={`edit-short-code-${link.id}`}
                    name="shortCode"
                    type="text"
                    defaultValue={link.shortCode}
                    placeholder="my-link"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500"
                  />
                </div>

                {editState.error ? (
                  <p className="text-sm text-red-400">{editState.error}</p>
                ) : null}

                {editState.message ? (
                  <p className="text-sm text-emerald-400">{editState.message}</p>
                ) : null}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={editPending}>
                    {editPending ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger
              className={cn(buttonVariants({ variant: "destructive", size: "sm" }), "text-sm")}
            >
              Delete
            </DialogTrigger>
            <DialogContent>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle>Delete short link</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to delete this link?
                  </DialogDescription>
                </div>
                <DialogCloseButton />
              </div>

              <form
                action={(formData) => {
                  deleteAction(formData);
                  handleDeleteSubmit();
                }}
                className="mt-6 space-y-4"
              >
                <input type="hidden" name="id" value={link.id} />

                {deleteState.error ? (
                  <p className="text-sm text-red-400">{deleteState.error}</p>
                ) : null}

                {deleteState.message ? (
                  <p className="text-sm text-emerald-400">{deleteState.message}</p>
                ) : null}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsDeleteOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="destructive" size="sm" disabled={deletePending}>
                    {deletePending ? "Deleting..." : "Delete link"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </li>
  );
}
