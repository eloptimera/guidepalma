"use client";

import { useMemo, useState, type ReactNode } from "react";

export interface FilterableItem {
  key: string;
  type: string;
  area: string;
  priceLevel: number;
  tags: string[];
  /** Sponsrad partner — placeras på fast position och märks i kortet. */
  sponsored?: boolean;
}

interface Props {
  items: FilterableItem[];
  /** Server-renderade kort, i samma ordning som items. */
  cards: ReactNode[];
  types: string[];
  areas: { slug: string; name: string }[];
  bestFor: string[];
  noun: string;
  /** Position för den sponsrade placeringen i gridet (0-baserad). */
  sponsoredSlot?: number;
}

const PRICES = [
  { v: "1", l: "€ · Inexpensive" },
  { v: "2", l: "€€ · Moderate" },
  { v: "3", l: "€€€ · Expensive" },
  { v: "4", l: "€€€€ · Splurge" },
];

/**
 * Filter + grid. Korten renderas på servern (bra för SEO och bundle-storlek);
 * klienten väljer bara vilka som visas. Utan JS syns alla kort.
 */
export function CategoryExplorer({ items, cards, types, areas, bestFor, noun, sponsoredSlot = 1 }: Props) {
  const [type, setType] = useState<string>("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");

  const active = !!(type || area || price || tag);

  const visible = useMemo(() => {
    const match = (it: FilterableItem) =>
      (!type || it.type === type) &&
      (!area || it.area === area) &&
      (!price || String(it.priceLevel) === price) &&
      (!tag || it.tags.includes(tag));
    const organic: number[] = [];
    const sponsored: number[] = [];
    items.forEach((it, i) => (match(it) ? (it.sponsored ? sponsored : organic).push(i) : null));
    // Sponsrat kort på en fast, förutsägbar position — aldrig först, aldrig mitt i en ranking.
    const order = [...organic];
    if (sponsored.length) order.splice(Math.min(sponsoredSlot, order.length), 0, ...sponsored);
    return order;
  }, [items, type, area, price, tag, sponsoredSlot]);

  const organicCount = visible.filter((i) => !items[i]?.sponsored).length;

  const reset = () => {
    setType("");
    setArea("");
    setPrice("");
    setTag("");
  };

  return (
    <>
      <div className="filters" role="search" aria-label={`Filter ${noun}`}>
        <div className="wrap filters-inner">
          <button className="chip" aria-pressed={!type} onClick={() => setType("")}>
            All
          </button>
          {types.map((t) => (
            <button key={t} className="chip" aria-pressed={type === t} onClick={() => setType(type === t ? "" : t)}>
              {t}
            </button>
          ))}
          <span className="filter-sep" aria-hidden />
          <Select label="Area" value={area} onChange={setArea} options={areas.map((a) => ({ v: a.slug, l: a.name }))} />
          <Select label="Price" value={price} onChange={setPrice} options={PRICES} />
          {bestFor.length ? <Select label="Best for" value={tag} onChange={setTag} options={bestFor.map((b) => ({ v: b, l: b }))} /> : null}
          {active ? (
            <button className="chip" onClick={reset} style={{ borderStyle: "dashed" }}>
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <div className="wrap">
        <p className="results-count" aria-live="polite">
          <span>
            {organicCount} {organicCount === 1 ? noun.replace(/s$/, "") : noun}
            {active ? " match your filters" : ""}
          </span>
          <span>Facts checked Nov 2026 · no paid placements</span>
        </p>
        {visible.length ? (
          <div className="card-grid">{visible.map((i) => <div key={items[i]!.key}>{cards[i]}</div>)}</div>
        ) : (
          <div className="empty">
            <p className="h3">Nothing quite matches.</p>
            <p className="text-soft mt-s">Try removing a filter — Palma is small, the good places are close by.</p>
            <button className="btn btn-ghost mt-m" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <label className={`select${value ? " is-set" : ""}`}>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}
