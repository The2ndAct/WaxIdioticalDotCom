import { getAllFilms } from "./films";
import { getAllPosts } from "./posts";
import type { FeedEntry } from "./types";

export function getFeedEntries(): FeedEntry[] {
  const films = getAllFilms().map((f): FeedEntry => ({ type: "film", data: f }));
  const posts = getAllPosts().map((p): FeedEntry => ({ type: "post", data: p }));

  return [...films, ...posts].sort((a, b) => {
    const dateA = a.type === "film" ? a.data.date : a.data.date;
    const dateB = b.type === "film" ? b.data.date : b.data.date;
    return dateA < dateB ? 1 : -1;
  });
}
