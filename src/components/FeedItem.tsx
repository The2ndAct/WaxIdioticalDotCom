import FilmCard from "./FilmCard";
import PostCard from "./PostCard";
import type { FeedEntry } from "@/lib/types";

interface Props {
  entry: FeedEntry;
}

export default function FeedItem({ entry }: Props) {
  if (entry.type === "film") {
    return <FilmCard film={entry.data} />;
  }
  return <PostCard post={entry.data} />;
}
