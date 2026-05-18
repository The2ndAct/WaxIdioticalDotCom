import type { Metadata } from "next";
import { getFeedEntries } from "@/lib/feed";
import FeedList from "@/components/FeedList";

export const metadata: Metadata = {
  title: "WaxIdiotical",
  description: "Short films, 48 Hour Film Projects, theater montages, and more.",
};

export default function HomePage() {
  const entries = getFeedEntries();

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] flex-col justify-end border-b border-border pb-12 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(232,200,74,0.05)_0%,_transparent_60%)]" />
        <p className="relative mb-2 font-body text-xs uppercase tracking-[0.3em] text-accent">
          Film cool stuff
        </p>
        <h1 className="relative font-display text-7xl leading-none tracking-widest text-foreground md:text-[10rem]">
          Wax Idiotical
        </h1>
      </section>

      {/* Feed */}
      <section className="py-16">
        <div className="mb-10 flex items-center gap-4">
          <h2 className="font-display text-xl tracking-[0.2em] text-accent">
            All Posts &amp; Films
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <FeedList entries={entries} />
      </section>
    </div>
  );
}
