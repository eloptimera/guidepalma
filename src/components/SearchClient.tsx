"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SearchDoc } from "@/types";
import { searchDocs } from "@/lib/search";
import { ResultRow } from "./ResultRow";
import { SearchIcon } from "./Icons";

const SUGGESTIONS = ["romantic dinner", "boat trip", "breakfast", "things to do with kids", "sunset", "late night", "cheap eats"];

export function SearchClient({ docs, sponsored }: { docs: SearchDoc[]; sponsored: SearchDoc[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") ?? "");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!params.get("q")) input.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const url = q ? `/search?q=${encodeURIComponent(q)}` : "/search";
      router.replace(url, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
  }, [q, router]);

  const results = useMemo(() => searchDocs(docs, q), [docs, q]);
  // Max en sponsrad träff, och bara om den är relevant för sökningen.
  const sponsoredHit = useMemo(() => (q ? searchDocs(sponsored, q)[0] : undefined), [sponsored, q]);
  const organic = results.filter((r) => r.id !== sponsoredHit?.id);

  return (
    <>
      <section className="search-hero">
        <div className="wrap">
          <p className="eyebrow text-terracotta">Search Palma</p>
          <form role="search" className="search-field" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="q" className="sr-only">
              Search restaurants, bars, beaches and experiences
            </label>
            <input
              ref={input}
              id="q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="romantic dinner…"
              autoComplete="off"
              enterKeyHint="search"
            />
            <SearchIcon size={32} />
          </form>
          <div className="search-suggest" aria-label="Suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className={`chip${q === s ? " is-active" : ""}`} onClick={() => setQ(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--section)" }}>
        {q ? (
          <>
            <p className="results-count" aria-live="polite">
              <span>
                {organic.length} {organic.length === 1 ? "result" : "results"} for &ldquo;{q}&rdquo;
              </span>
            </p>
            {sponsoredHit ? <ResultRow doc={sponsoredHit} promoted /> : null}
            {organic.length ? (
              <div className="search-results">
                {organic.slice(0, 30).map((d) => (
                  <ResultRow key={d.kind + d.id} doc={d} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <p className="h3">Nothing yet for that.</p>
                <p className="text-soft mt-s">Try one of the suggestions above — or a neighbourhood like Santa Catalina.</p>
              </div>
            )}
          </>
        ) : (
          <p className="text-soft">Try a mood, a dish, a neighbourhood or a time of day.</p>
        )}
      </section>
    </>
  );
}
