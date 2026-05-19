import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllFilms, getFilmBySlug } from "@/lib/films";
import VideoEmbed from "@/components/VideoEmbed";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFilms().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilmBySlug(slug);
  if (!film) return {};
  return {
    title: film.title,
    description: film.description,
    openGraph: {
      title: film.title,
      description: film.description,
      images: [`https://img.youtube.com/vi/${film.youtubeId}/maxresdefault.jpg`],
    },
  };
}

const categoryLabels: Record<string, string> = {
  "48-hour-films": "48 Hour Films",
  "theater-montages": "Theater Promos",
  other: "Other",
};

const categoryHrefs: Record<string, string> = {
  "48-hour-films": "/48-hour-films",
  "theater-montages": "/theater-montages",
  other: "/other",
};

interface CreditRowProps {
  label: string;
  value: string | undefined;
}

function CreditRow({ label, value }: CreditRowProps) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="w-36 shrink-0 font-body text-xs uppercase tracking-[0.15em] text-muted/60">
        {label}
      </span>
      <span className="font-body text-sm text-foreground/80">{value}</span>
    </div>
  );
}

export default async function FilmPage({ params }: Props) {
  const { slug } = await params;
  const film = getFilmBySlug(slug);
  if (!film) notFound();

  const credits: { label: string; value: string | undefined }[] = [
    { label: "Genre", value: film.genre },
    { label: "City / Event", value: film.cityEvent },
    { label: "Directed by", value: film.directedBy },
    { label: "Written by", value: film.writtenBy },
    { label: "Edited by", value: film.editedBy },
    { label: "Shot by", value: film.shotBy },
    { label: "Cast", value: film.cast },
    { label: "Original Score", value: film.originalScore },
    { label: "Original Song", value: film.originalSong },
    { label: "Other Crew", value: film.otherCrew },
  ].filter((c): c is { label: string; value: string } => Boolean(c.value));

  return (
    <div className="py-16">
      {/* Breadcrumb */}
      <a
        href={categoryHrefs[film.category]}
        className="mb-8 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
      >
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {categoryLabels[film.category]}
      </a>

      {/* Title */}
      <h1
        className={`mb-2 leading-none tracking-wide text-foreground ${
          film.keepCase
            ? "font-body text-4xl font-semibold md:text-6xl"
            : "font-display text-5xl md:text-7xl"
        }`}
      >
        {film.title}
      </h1>
      <p className="mb-10 font-body text-xs tracking-widest text-muted">
        {new Date(film.date + "T00:00:00").toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Embed */}
      <div className="mx-auto max-w-4xl">
        <VideoEmbed youtubeId={film.youtubeId} vimeoId={film.vimeoId} title={film.title} />
      </div>

      {/* Description + Credits */}
      <div className="mx-auto mt-10 max-w-4xl border-t border-border pt-8">
        {film.description && (
          <p className="mb-10 font-body text-base leading-relaxed text-foreground/70">
            {film.description}
          </p>
        )}

        {credits.length > 0 && (
          <div className="flex flex-col gap-3">
            {credits.map((c) => (
              <CreditRow key={c.label} label={c.label} value={c.value} />
            ))}
          </div>
        )}

        {film.elements && film.elements.length > 0 && (
          <div className="mt-10 border-t border-border pt-8">
            <h2 className="mb-4 font-display text-2xl tracking-wide text-foreground">Elements</h2>
            <ul className="flex flex-col gap-2">
              {film.elements.map((el) => (
                <li key={el} className="font-body text-sm text-foreground/80">
                  {el}
                </li>
              ))}
            </ul>
          </div>
        )}

        {film.awards && film.awards.length > 0 && (
          <div className="mt-10 border-t border-border pt-8">
            <h2 className="mb-4 font-display text-2xl tracking-wide text-foreground">Awards</h2>
            <ul className="flex flex-col gap-2">
              {film.awards.map((award) => (
                <li key={award} className="font-body text-sm text-foreground/80">
                  {award}
                </li>
              ))}
            </ul>
          </div>
        )}

        {film.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {film.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-3 py-1 font-body text-xs uppercase tracking-widest text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {film.extras && film.extras.length > 0 && (
          <div className="mt-10 border-t border-border pt-8">
            <h2 className="mb-6 font-display text-2xl tracking-wide text-foreground">Extras</h2>
            <div className="flex flex-col gap-10">
              {film.extras.map((extra) => (
                <div key={extra.title}>
                  <p className="mb-3 font-body text-sm uppercase tracking-widest text-muted">{extra.title}</p>
                  <VideoEmbed youtubeId={extra.youtubeId} vimeoId={extra.vimeoId} title={extra.title} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
