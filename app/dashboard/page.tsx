import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserShortLinks } from "@/data/links";
import { CreateLinkForm } from "./CreateLinkForm";
import { LinkListItem } from "./LinkListItem";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getUserShortLinks(userId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-950 px-6 py-16 font-sans text-zinc-50">
      {/* Outer card: make it a column with a max height tied to viewport and hide overflow so inner area can scroll */}
      <div className="w-full max-w-5xl rounded-[2rem] border border-zinc-800 bg-zinc-900/95 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col max-h-[calc(100vh-8rem)] overflow-hidden p-8 sm:p-10">
          {/* Header: fixed inside the card (won't scroll away) */}
          <div className="flex items-center justify-between gap-6 border-b border-zinc-800 pb-6 flex-shrink-0">
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm text-zinc-400">
                {links.length} {links.length === 1 ? "link" : "links"}
              </div>

              <Dialog>
                <DialogTrigger
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" }),
                    "text-sm",
                  )}
                >
                  Create link
                </DialogTrigger>
                <DialogContent>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <DialogTitle>Create a new short link</DialogTitle>
                      <DialogDescription>
                        Add a destination URL and a short code that will be used
                        for your new link.
                      </DialogDescription>
                    </div>
                    <DialogCloseButton />
                  </div>
                  <div className="mt-6">
                    <CreateLinkForm />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              My Links
            </h1>
          </div>

          {/* Scrollable body: will scroll internally while the header stays visible */}
          <div className="overflow-y-auto px-0 py-6">
            {links.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-950/70 p-8 text-center text-zinc-400">
                No short links yet. Create your first one from the homepage.
              </div>
            ) : (
              <ul className="mt-0 space-y-4">
                {links.map((link) => (
                  <LinkListItem key={link.id} link={link} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
