import type { Metadata } from "next";
import { getFilmsByCategory } from "@/lib/films";
import FilmGrid from "@/components/FilmGrid";

export const metadata: Metadata = {
  title: "Theater Promos",
  description: "Highlights and montages from theatrical productions.",
};

export default function TheaterMontagesPage() {
  const films = getFilmsByCategory("theater-montages");

  return (
    <div className="py-16">
      <header className="mb-14 border-b border-border pb-10">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-accent">
          Category
        </p>
        <h1 className="font-display text-6xl leading-none tracking-widest text-foreground md:text-8xl">
          Theater Promos
        </h1>
        <p className="mt-4 max-w-lg font-body text-base text-muted">
          Highlights from theatrical productions.
        </p>
      </header>
      <FilmGrid films={films} />
    </div>
  );
}
