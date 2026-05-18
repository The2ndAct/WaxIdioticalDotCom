import FilmCard from "./FilmCard";
import type { Film } from "@/lib/types";

interface Props {
  films: Film[];
}

export default function FilmGrid({ films }: Props) {
  if (films.length === 0) {
    return (
      <p className="font-body text-muted">No films here yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {films.map((film) => (
        <FilmCard key={film.slug} film={film} />
      ))}
    </div>
  );
}
