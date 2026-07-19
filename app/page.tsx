import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-16 sm:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-2xl space-y-6">
            <p className="inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-300">
              Built for fast, secure link sharing
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
                Shorten your URLs, track clicks, and keep every link under control.
              </h1>
              <p className="text-lg leading-8 text-zinc-400">
                A polished link shortener with authentication, analytics-ready management, and a clean dashboard for modern workflows.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                <Button variant="default">Create account</Button>
              </SignUpButton>
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <Button variant="outline">Sign in</Button>
              </SignInButton>
            </div>
          </div>

          <div className="grid gap-4">
            <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-zinc-50">Instant short links</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Turn long URLs into compact short links with a clean interface designed for speed.
              </p>
            </article>
            <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-zinc-50">Authenticated dashboard</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Access your personal dashboard securely through Clerk and manage links in one place.
              </p>
            </article>
            <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-zinc-50">Modern interface</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                A sleek, responsive UI that keeps your workflow focused and easy to navigate.
              </p>
            </article>
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-base font-semibold text-zinc-50">One-click creation</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Create a new short URL instantly and share it anywhere.</p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-base font-semibold text-zinc-50">Secure sessions</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Sign in with Clerk and keep your link collection protected and private.</p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-base font-semibold text-zinc-50">Ready for growth</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Use a robust foundation built with Next.js, Clerk, and Tailwind to scale easily.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
