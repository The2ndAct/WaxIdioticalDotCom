import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "News",
  description: "Updates, behind-the-scenes, and announcements from Wax Idiotical.",
};

export default function NewsPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16">
      <header className="mb-14 border-b border-border pb-10">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-accent">
          Updates
        </p>
        <h1 className="font-display text-6xl leading-none tracking-widest text-foreground md:text-8xl">
          News
        </h1>
        <p className="mt-4 max-w-lg font-body text-base text-muted">
          Behind-the-scenes, announcements, and everything else.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="font-body text-muted">Nothing here yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
