import FeedItem from "./FeedItem";
import type { FeedEntry } from "@/lib/types";

interface Props {
  entries: FeedEntry[];
}

export default function FeedList({ entries }: Props) {
  if (entries.length === 0) {
    return <p className="font-body text-muted">Nothing here yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <FeedItem
          key={entry.type === "film" ? `film-${entry.data.slug}` : `post-${entry.data.slug}`}
          entry={entry}
        />
      ))}
    </div>
  );
}
