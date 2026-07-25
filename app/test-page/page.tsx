import Link from "next/link";

export const metadata = {
  title: "Test Page",
};

export default function TestPage(): JSX.Element {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p className="mt-4">This is a simple test page at /test-page.</p>
      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">Go home</Link>
      </div>
    </main>
  );
}
