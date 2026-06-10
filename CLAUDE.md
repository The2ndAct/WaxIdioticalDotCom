# WaxIdiotical.com — Claude Context

Website for Wax Idiotical, a short-film team that has competed in the 48 Hour Film Project since 2008. Hosted at **waxidiotical.com**, deployed via Vercel from the `main` branch of `github.com/The2ndAct/WaxIdioticalDotCom`.

## Stack

- **Next.js 16** (App Router, TypeScript, fully static — no server runtime)
- **Tailwind CSS v3** with custom dark/cinematic theme
- **Content**: JSON + Markdown files read at build time via `fs` (no CMS, no database)
- **Fonts**: Bebas Neue (display headings), DM Sans (body/UI), Lora (prose)
- **Deployment**: push to `main` → Vercel auto-deploys. All work commits directly to `main` (no PR workflow).

## Dev commands

```bash
npm run dev    # local dev server at localhost:3000
npm run build  # production build (runs ESLint + TypeScript)
npm run lint   # ESLint only
```

## File structure

```
content/
  films/films.json          # All film data — single source of truth
  posts/posts.json          # Blog post metadata
  posts/*.md                # Blog post bodies (Markdown)
public/
  logo.png                  # Site logo — used as Vimeo thumbnail placeholder
src/
  app/
    page.tsx                # Home: latest film embed + chronological feed
    48-hour-films/page.tsx  # Category grid
    theater-montages/page.tsx
    other/page.tsx
    about/page.tsx          # About page (contact: kyp@waxidiotical.com)
    films/[slug]/page.tsx   # Film detail: embed + credits + extras
    news/page.tsx           # Blog index
    news/[slug]/page.tsx    # Blog post
  components/
    Nav.tsx                 # Top nav — link order matters (see below)
    VideoEmbed.tsx          # YouTube + Vimeo facade embed (client component)
    FilmCard.tsx            # Thumbnail card used in grids
    FilmGrid.tsx            # Responsive 1→2→3 col grid
    FeedItem.tsx / FeedList.tsx  # Home feed (films + posts merged)
  lib/
    types.ts                # Film, Post, FeedEntry interfaces
    films.ts                # getAllFilms() — sorts by date DESC
    posts.ts                # getAllPosts(), getPostBySlug()
    feed.ts                 # Merges films + posts, sorted by date DESC
```

## Adding content

### New 48-hour film
Add an entry to `content/films/films.json`. Required fields: `slug`, `title`, `youtubeId` (or `vimeoId`), `category`, `description`, `date`, `tags`. Optional: all credit fields, `elements`, `awards`, `extras`, `keepCase`, `thumbnailUrl`.

**Ordering is controlled entirely by the `date` field** — `getAllFilms()` sorts by date descending. Use a real or approximate date that places the film in the correct position.

### Extras / bloopers
Add to the film's `extras` array. Extras are hidden from feeds/grids — they only appear on the film's detail page.
```json
"extras": [
  { "title": "Bloopers", "youtubeId": "VIDEO_ID" },
  { "title": "Bloopers", "vimeoId": "VIMEO_ID" }
]
```

### Vimeo videos
Set `vimeoId` instead of (or in addition to) `youtubeId`. Vimeo has no predictable thumbnail URL, so the site uses the Wax Idiotical logo as a placeholder automatically.

### New blog post
1. Add metadata to `content/posts/posts.json` (`slug`, `title`, `excerpt`, `date`, `published: true`)
2. Create `content/posts/<slug>.md` with the post body

## Design tokens (Tailwind)

| Token | Value | Use |
|---|---|---|
| `background` | `#0a0a0a` | Page background |
| `surface` | `#111111` | Card backgrounds |
| `border` | `#1f1f1f` | Dividers, card borders |
| `accent` | `#e8c84a` | Gold — hover states, badges, play button |
| `muted` | `#6b6b6b` | Secondary text |
| `foreground` | `#f0ece4` | Primary text |
| `font-display` | Bebas Neue | Section headings, film titles |
| `font-body` | DM Sans | UI, nav, card metadata |
| `font-prose` | Lora | Blog post body |

## Nav link order

```ts
{ href: "/", label: "Home" },
{ href: "/news", label: "News" },
{ href: "/48-hour-films", label: "48 Hour Films" },
{ href: "/theater-montages", label: "Theater Promos" },
{ href: "/other", label: "Other" },
{ href: "/about", label: "About Us" },
```

## Film type reference

```ts
interface Film {
  slug: string;
  title: string;
  youtubeId?: string;
  vimeoId?: string;
  thumbnailUrl?: string;       // manual override for card thumbnail
  category: "48-hour-films" | "theater-montages" | "other";
  description: string;
  date: string;                // YYYY-MM-DD — controls sort order
  tags: string[];
  keepCase?: boolean;          // true = use font-body instead of font-display for title
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
  elements?: string[];         // 48HFP required elements
  awards?: string[];
  extras?: { title: string; youtubeId?: string; vimeoId?: string }[];
}
```

## Home page "Latest" section

The featured embed at the top of the home page (`src/app/page.tsx`) always shows the most recent **48-hour film** (`getFilmsByCategory("48-hour-films")[0]`), not the most recent film across all categories. This is intentional — adding a theater promo should not displace the featured 48HFP film.

## Key gotchas

- **zsh glob expansion**: always quote paths containing `[slug]` in shell commands: `git add 'src/app/films/[slug]/page.tsx'`
- **Vimeo thumbnails**: cannot be derived from the Vimeo ID — the logo placeholder is intentional
- **`extras` are hidden from feeds**: they live only on the film detail page; do not add bloopers as top-level film entries
- **Category badge labels**: `"48-hour-films"` → "48HFP", `"theater-montages"` → "Promo", `"other"` → "Other"
- **Theater Montages route**: URL is `/theater-montages` but the display label is "Theater Promos" everywhere in the UI
