import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { Post } from "./types";

const postsDir = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
  const raw = fs.readFileSync(path.join(postsDir, "posts.json"), "utf-8");
  const posts: Post[] = JSON.parse(raw);
  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export async function getPostContent(slug: string): Promise<string> {
  const filePath = path.join(postsDir, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  const result = await remark().use(remarkHtml).process(content);
  return result.toString();
}
