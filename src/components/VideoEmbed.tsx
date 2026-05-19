"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  youtubeId?: string;
  vimeoId?: string;
  title: string;
}

export default function VideoEmbed({ youtubeId, vimeoId, title }: Props) {
  const [playing, setPlaying] = useState(false);

  const thumb = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : null;

  const embedSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`
    : null;

  if (!embedSrc) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {playing ? (
        <iframe
          src={embedSrc}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex w-full items-center justify-center"
          aria-label={`Play ${title}`}
        >
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <Image src="/logo.png" alt="Wax Idiotical" fill className="object-contain opacity-20 -translate-x-6 translate-y-8" />
          </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/60 bg-black/70 transition-transform duration-300 group-hover:scale-110">
            <svg className="ml-1 h-6 w-6 fill-accent" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
