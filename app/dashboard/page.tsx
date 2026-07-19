import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-start justify-start bg-zinc-950 px-6 py-16 font-sans text-zinc-50">
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-10 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-3 text-lg leading-8 text-zinc-400">
          You are signed in and can manage your short links here.
        </p>
      </div>
    </main>
  );
}
