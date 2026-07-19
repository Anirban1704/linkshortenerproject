import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { shadcn } from "@clerk/ui/themes";
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener",
  description:
    "Shorten links quickly with authentication and a modern dashboard built on Next.js.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
        style={{ colorScheme: "dark" }}
      >
        <body className="min-h-full flex flex-col bg-background text-foreground">
          <header className="flex items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-950/95 px-6 py-4 text-zinc-50">
            <Link href="/" className="font-semibold text-lg hover:text-zinc-100">
              Link Shortener
            </Link>
            <div className="flex items-center gap-3">
              {userId ? (
                <UserButton />
              ) : (
                <>
                  <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                    <Button variant="outline" size="sm">Sign in</Button>
                  </SignInButton>
                  <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                    <Button variant="default" size="sm">Sign up</Button>
                  </SignUpButton>
                </>
              )}
            </div>
          </header>
          <main className="flex-1 bg-background text-foreground">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
