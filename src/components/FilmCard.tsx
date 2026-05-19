import Link from "next/link";
import Image from "next/image";
import type { Film } from "@/lib/types";

const categoryLabels: Record<Film["category"], string> = {
  "48-hour-films": "48HFP",
  "theater-montages": "Promo",
  other: "Other",
};

interface Props {
  film: Film;
}

export default function FilmCard({ film }: Props) {
  const thumb = film.thumbnailUrl
    ?? (film.youtubeId ? `https://img.youtube.com/vi/${film.youtubeId}/maxresdefault.jpg` : null);

  return (
    <Link
      href={`/films/${film.slug}`}
      className="group block overflow-hidden rounded-none border border-border bg-surface transition-all duration-300 hover:border-accent hover:shadow-[0_0_24px_rgba(232,200,74,0.08)]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-black">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={film.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <Image
              src="/logo.png"
              alt="Wax Idiotical"
              width={80}
              height={80}
              className="opacity-30"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/60 bg-black/70">
            <svg className="ml-0.5 h-4 w-4 fill-accent" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Category badge */}
        <span className="absolute left-0 top-0 bg-accent px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-widest text-black">
          {categoryLabels[film.category]}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className={`${film.keepCase ? "font-body text-xl font-semibold" : "font-display text-2xl"} leading-tight tracking-wide text-foreground transition-colors group-hover:text-accent`}>
          {film.title}
        </h3>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-muted line-clamp-2">
          {film.description}
        </p>
        <p className="mt-3 font-body text-xs tracking-wider text-muted/60">
          {new Date(film.date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
