import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-accent">404</h1>
      <p className="mt-4 text-lg text-text-tertiary" role="alert">
        This page does not exist.
      </p>
      <p className="mt-1 text-sm text-text-tertiary">
        Cette page n&apos;existe pas.
      </p>
      <Link
        href="/"
        className="mt-8 rounded bg-accent px-6 py-2 font-medium text-background transition-opacity hover:opacity-90"
      >
        Go home / Accueil
      </Link>
    </main>
  );
}
