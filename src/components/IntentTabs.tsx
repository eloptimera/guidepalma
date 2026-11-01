"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * "What kind of Palma day are you planning?" — tillgängliga tabs (ARIA tablist).
 * Panelerna renderas på servern och skickas in som children, så att allt
 * innehåll finns i HTML:en för SEO; klienten byter bara vilken som visas.
 */
export function IntentTabs({ tabs, panels }: { tabs: { slug: string; label: string }[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div className="intent-tabs" role="tablist" aria-label="Choose the kind of day">
        {tabs.map((t, i) => (
          <button
            key={t.slug}
            id={`${id}-tab-${i}`}
            role="tab"
            className="intent-tab"
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <div
          key={tabs[i]?.slug ?? i}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          className={`intent-panel${i === active ? " fade-in" : ""}`}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
