import type { Metadata } from "next";
import { getFilmsByCategory } from "@/lib/films";
import FilmGrid from "@/components/FilmGrid";

export const metadata: Metadata = {
  title: "Other",
  description: "Standalone short film projects and everything else.",
};

export default function OtherPage() {
  const films = getFilmsByCategory("other");

  return (
    <div className="py-16">
      <header className="mb-14 border-b border-border pb-10">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-accent">
          Category
        </p>
        <h1 className="font-display text-6xl leading-none tracking-widest text-foreground md:text-8xl">
          Other
        </h1>
        <p className="mt-4 max-w-lg font-body text-base text-muted">
          Standalone projects and everything that doesn&apos;t fit elsewhere.
        </p>
      </header>
      <FilmGrid films={films} />
    </div>
  );
}
