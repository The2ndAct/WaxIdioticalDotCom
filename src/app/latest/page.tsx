import type { Metadata } from "next";
import { getFeedEntries } from "@/lib/feed";
import FeedList from "@/components/FeedList";

export const metadata: Metadata = {
  title: "Latest",
  description: "The most recently added films and posts on WaxIdiotical.",
};

const LATEST_COUNT = 12;

export default function LatestPage() {
  const entries = getFeedEntries().slice(0, LATEST_COUNT);

  return (
    <div className="py-16">
      <header className="mb-14 border-b border-border pb-10">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-accent">
          Newest First
        </p>
        <h1 className="font-display text-6xl leading-none tracking-widest text-foreground md:text-8xl">
          Latest
        </h1>
        <p className="mt-4 max-w-lg font-body text-base text-muted">
          The most recent films and posts across all categories.
        </p>
      </header>
      <FeedList entries={entries} />
    </div>
  );
}
