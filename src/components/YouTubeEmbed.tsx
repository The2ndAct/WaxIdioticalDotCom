"use client";

import { useState } from "react";

interface Props {
  youtubeId: string;
  title: string;
}

export default function YouTubeEmbed({ youtubeId, title }: Props) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-sm bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-sm bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
      {/* play button */}
      <button
        onClick={() => setPlaying(true)}
        aria-label={`Play ${title}`}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-black/60 transition-all duration-200 group-hover:scale-110 group-hover:bg-black/80">
          <svg
            className="ml-1 h-6 w-6 fill-accent"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>
    </div>
  );
}
