import type { Metadata } from "next";
import { getFilmsByCategory } from "@/lib/films";
import FilmGrid from "@/components/FilmGrid";

export const metadata: Metadata = {
  title: "48 Hour Films",
  description: "Short films created during 48 Hour Film Project competitions.",
};

export default function FortyEightHourFilmsPage() {
  const films = getFilmsByCategory("48-hour-films");

  return (
    <div className="py-16">
      <header className="mb-14 border-b border-border pb-10">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-accent">
          Category
        </p>
        <h1 className="font-display text-6xl leading-none tracking-widest text-foreground md:text-8xl">
          48 Hour Films
        </h1>
        <p className="mt-4 max-w-lg font-body text-base text-muted">
          Short films made under pressure — 48 hours from blank page to finished cut.
        </p>
      </header>
      <FilmGrid films={films} />
    </div>
  );
}
