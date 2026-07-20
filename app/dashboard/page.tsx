import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getUserShortLinks } from "@/data/links";

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

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getUserShortLinks(userId);

  return (
    <main className="flex min-h-screen flex-col items-start justify-start bg-zinc-950 px-6 py-16 font-sans text-zinc-50">
      <div className="w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900 p-10 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
              Dashboard
            </h1>
            <p className="mt-3 text-lg leading-8 text-zinc-400">
              Here are the short links created with your account.
            </p>
          </div>

          <div className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm text-zinc-400">
            {links.length} {links.length === 1 ? "link" : "links"}
          </div>
        </div>

        {links.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/70 p-8 text-center text-zinc-400">
            No short links yet. Create your first one from the homepage.
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {links.map((link) => (
              <li
                key={link.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-100">
                      /{link.shortCode}
                    </p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block truncate text-sm text-zinc-400 transition hover:text-zinc-200"
                    >
                      {link.url}
                    </a>
                  </div>

                  <div className="text-sm text-zinc-500">
                    <p>Created {formatDate(link.createdAt)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
