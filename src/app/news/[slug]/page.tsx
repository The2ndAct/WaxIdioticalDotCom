import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostContent } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = await getPostContent(slug);

  return (
    <div className="py-16">
      <Link
        href="/news"
        className="mb-8 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
      >
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        News
      </Link>

      <header className="mb-12 max-w-2xl border-b border-border pb-10">
        <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
          Post
        </p>
        <h1 className="font-display text-5xl leading-none tracking-wide text-foreground md:text-7xl">
          {post.title}
        </h1>
        <p className="mt-4 font-body text-sm text-muted">
          {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <article
        className="prose prose-invert max-w-2xl font-prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
