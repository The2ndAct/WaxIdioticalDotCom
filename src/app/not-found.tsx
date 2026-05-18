import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-8xl text-accent">404</p>
      <h2 className="mt-4 font-display text-3xl tracking-wide text-foreground">
        Page Not Found
      </h2>
      <p className="mt-3 font-body text-muted">
        That page doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 font-body text-sm uppercase tracking-widest text-accent hover:text-accent-dim"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
