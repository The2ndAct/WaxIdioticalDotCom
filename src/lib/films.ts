import fs from "fs";
import path from "path";
import type { Film, FilmCategory } from "./types";

const filmsPath = path.join(process.cwd(), "content/films/films.json");

export function getAllFilms(): Film[] {
  const raw = fs.readFileSync(filmsPath, "utf-8");
  const films: Film[] = JSON.parse(raw);
  return films.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFilmsByCategory(category: FilmCategory): Film[] {
  return getAllFilms().filter((f) => f.category === category);
}

export function getFilmBySlug(slug: string): Film | undefined {
  return getAllFilms().find((f) => f.slug === slug);
}
