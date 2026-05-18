"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/48-hour-films", label: "48 Hour Films" },
  { href: "/theater-montages", label: "Theater Montages" },
  { href: "/latest", label: "Latest" },
  { href: "/other", label: "Other" },
  { href: "/news", label: "News" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center opacity-90 transition-opacity hover:opacity-100">
          {/* overflow-hidden crops the "wax idiotical films" text at the bottom of the PNG */}
          <div className="overflow-hidden" style={{ height: 40 }}>
            <Image
              src="/logo.png"
              alt="Wax Idiotical Films"
              width={120}
              height={68}
              className="w-auto"
              style={{ height: 54, marginTop: -2 }}
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "relative font-body text-xs uppercase tracking-[0.15em] transition-colors",
                pathname === l.href
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              )}
            >
              {l.label}
              {pathname === l.href && (
                <span className="absolute -bottom-[17px] left-0 right-0 h-px bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col items-end gap-1.5 p-1 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={clsx("block h-px bg-foreground transition-all duration-300", open ? "w-6 translate-y-[7px] rotate-45" : "w-6")} />
          <span className={clsx("block h-px bg-foreground transition-all duration-300", open ? "w-0 opacity-0" : "w-4")} />
          <span className={clsx("block h-px bg-foreground transition-all duration-300", open ? "w-6 -translate-y-[7px] -rotate-45" : "w-6")} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border bg-surface px-4 py-6 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "block py-3 font-body text-xs uppercase tracking-[0.2em] transition-colors",
                pathname === l.href ? "text-accent" : "text-muted hover:text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
