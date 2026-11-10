import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-sm text-mint">SELECT * FROM pages WHERE url = this; — 0 rows</p>
        <h1 className="mt-3 font-display text-5xl font-semibold">Page not found.</h1>
        <Link href="/" className="mt-6 inline-block text-mint underline-offset-4 hover:underline">Back to home</Link>
      </div>
    </main>
  );
}
