export type FilmCategory = "48-hour-films" | "theater-montages" | "other";

export interface Film {
  slug: string;
  title: string;
  youtubeId: string;
  category: FilmCategory;
  description: string;
  date: string;
  tags: string[];
  keepCase?: boolean;
  genre?: string;
  cityEvent?: string;
  directedBy?: string;
  writtenBy?: string;
  editedBy?: string;
  shotBy?: string;
  cast?: string;
  originalScore?: string;
  originalSong?: string;
  otherCrew?: string;
  elements?: string[];
  awards?: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  published: boolean;
}

export type FeedEntry =
  | { type: "film"; data: Film }
  | { type: "post"; data: Post };
