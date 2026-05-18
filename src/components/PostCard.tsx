import Link from "next/link";
import type { Post } from "@/lib/types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex flex-col justify-between rounded-none border border-border bg-surface p-6 transition-all duration-300 hover:border-accent hover:shadow-[0_0_24px_rgba(232,200,74,0.08)]"
    >
      <div>
        <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
          Post
        </p>
        <h3 className="font-display text-3xl leading-tight tracking-wide text-foreground transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-muted line-clamp-3">
          {post.excerpt}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="font-body text-xs tracking-wider text-muted/60">
          {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <span className="font-body text-xs uppercase tracking-wider text-accent opacity-0 transition-opacity group-hover:opacity-100">
          Read →
        </span>
      </div>
    </Link>
  );
}
