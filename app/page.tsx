import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-950 px-6 py-16 font-sans text-zinc-50">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-10 shadow-sm sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="mt-8 flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-zinc-50">
            Clerk is now connected to your Next.js app.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-400">
            {userId
              ? "You are signed in and can use the profile menu in the top-right."
              : "Sign in or create an account to see the Clerk experience in action."}
          </p>
        </div>
      </main>
    </div>
  );
}
