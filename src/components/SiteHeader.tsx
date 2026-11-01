"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "./Icons";

export interface NavItem {
  label: string;
  href: string;
  /** Underlänkar i mobilmenyn. */
  children?: { label: string; href: string }[];
}

/** Sidor med helbilds-hero där headern ligger transparent ovanpå bilden. */
function hasOverlayHero(path: string) {
  if (path === "/") return true;
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "neighbourhoods" && parts.length === 2) return true;
  // /<kategori>/<plats-eller-topplista>
  return parts.length === 2 && !["guides", "neighbourhoods", "search"].includes(parts[0]!);
}

export function SiteHeader({ brand, nav }: { brand: [string, string]; nav: NavItem[] }) {
  const pathname = usePathname();
  const overlayRoute = hasOverlayHero(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      setScrolled(y > 48);
      // Göm vid scroll nedåt långt ner, visa direkt vid scroll uppåt.
      if (y < 480) setHidden(false);
      else if (dy > 6) setHidden(true);
      else if (dy < -6) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stäng menyn vid navigering.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className="site-header"
        data-overlay={overlayRoute && !scrolled ? "true" : "false"}
        data-hidden={hidden && !open ? "true" : "false"}
      >
        <div className="wrap header-inner">
          <Link href="/" className="wordmark" aria-label={`${brand.join(" ")} — home`}>
            <span>{brand[0]}</span>
            <span>{brand[1]}</span>
          </Link>

          <nav className="main-nav" aria-label="Main">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link href="/search" className="icon-btn" aria-label="Search">
              <SearchIcon />
            </Link>
            <button
              ref={menuBtn}
              className="menu-btn"
              aria-expanded={open}
              aria-controls="menu-sheet"
              onClick={() => setOpen(true)}
            >
              Menu <span className="burger" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-sheet"
        className="menu-sheet"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <div className="wrap menu-sheet-top">
          <Link href="/" className="wordmark">
            <span>{brand[0]}</span>
            <span>{brand[1]}</span>
          </Link>
          <button ref={closeBtn} className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav className="wrap menu-groups" aria-label="Mobile">
          {nav.map((item) => (
            <div key={item.href} className="menu-group">
              <Link href={item.href}>
                {item.label}
                {item.children?.length ? <small>{item.children.length} sections</small> : null}
              </Link>
              {item.children?.length ? (
                <div className="menu-sub">
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} className="chip">
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
