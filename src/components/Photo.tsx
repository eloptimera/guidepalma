import Image from "next/image";
import type { Media, Motif } from "@/types";

const LIGHT_TONES = new Set(["stone", "sand", "morning"]);

interface PhotoProps {
  media: Media;
  /** Responsiva storlekar för next/image, t.ex. "(min-width: 900px) 50vw, 100vw". */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Visa fotobriefen på placeholdern (för stora bilder). */
  showBrief?: boolean;
  /** Klipp-reveal när bilden scrollas in. */
  reveal?: boolean;
  /** Dekorativ bild — dölj för skärmläsare (t.ex. när bredvidliggande text redan beskriver). */
  decorative?: boolean;
}

/**
 * Alla bilder på sajten går genom den här komponenten.
 * - Finns media.src: optimerad next/image (AVIF/WebP, lazy, responsiv).
 * - Annars: en art-directed placeholder i rätt färgton, med fotobrief —
 *   så att sajten ser avsiktlig ut innan riktiga foton finns.
 */
export function Photo({ media, sizes = "100vw", priority, className, showBrief, reveal, decorative }: PhotoProps) {
  return (
    <div className={`photo${className ? ` ${className}` : ""}`} data-reveal={reveal ? "image" : undefined}>
      {media.src ? (
        <Image
          src={media.src}
          alt={decorative ? "" : media.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: media.focal }}
        />
      ) : (
        <div
          className={`plate tone-${media.tone}${LIGHT_TONES.has(media.tone) ? " plate-light" : ""}`}
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : media.alt}
          aria-hidden={decorative || undefined}
        >
          <MotifArt motif={media.motif ?? "none"} />
          <div className="plate-grain" />
          {showBrief && media.brief ? <span className="plate-brief">Photo — {media.brief}</span> : null}
        </div>
      )}
    </div>
  );
}

function MotifArt({ motif }: { motif: Motif }) {
  if (motif === "none") return null;
  const common = {
    className: "plate-motif",
    viewBox: "0 0 400 500",
    preserveAspectRatio: "xMidYMid slice",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    "aria-hidden": true,
  } as const;
  const ns = { vectorEffect: "non-scaling-stroke" } as const;

  switch (motif) {
    case "horizon":
      return (
        <svg {...common}>
          <circle cx="272" cy="262" r="44" fill="currentColor" fillOpacity="0.38" stroke="none" />
          <line x1="-20" y1="318" x2="420" y2="318" style={ns} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1={272 - 40 + i * 6} y1={334 + i * 14} x2={272 + 40 - i * 6} y2={334 + i * 14} style={ns} strokeOpacity={0.8 - i * 0.12} />
          ))}
        </svg>
      );
    case "arch":
      return (
        <svg {...common}>
          {[40, 150, 260].map((x) => (
            <path key={x} d={`M${x} 520 V270 Q${x} 180 ${x + 50} 140 Q${x + 100} 180 ${x + 100} 270 V520`} style={ns} />
          ))}
          <line x1="-20" y1="455" x2="420" y2="455" style={ns} strokeOpacity="0.6" />
        </svg>
      );
    case "shutters":
      return (
        <svg {...common}>
          {[110, 205].map((x) => (
            <g key={x}>
              <rect x={x} y="90" width="85" height="330" style={ns} />
              {Array.from({ length: 24 }, (_, i) => (
                <line key={i} x1={x + 8} x2={x + 77} y1={104 + i * 13} y2={104 + i * 13} style={ns} strokeOpacity="0.7" />
              ))}
            </g>
          ))}
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="200" cy="230" r="110" fill="currentColor" fillOpacity="0.22" stroke="none" />
          <circle cx="200" cy="230" r="150" style={ns} strokeOpacity="0.7" />
          <circle cx="200" cy="230" r="196" style={ns} strokeOpacity="0.4" />
        </svg>
      );
    case "waves":
      return (
        <svg {...common}>
          {Array.from({ length: 9 }, (_, i) => {
            const y = 220 + i * 34;
            return (
              <path
                key={i}
                d={`M-20 ${y} C 40 ${y - 14}, 80 ${y - 14}, 120 ${y} S 200 ${y + 14}, 260 ${y} S 360 ${y - 14}, 420 ${y}`}
                style={ns}
                strokeOpacity={0.35 + i * 0.07}
              />
            );
          })}
        </svg>
      );
    case "table":
      return (
        <svg {...common}>
          {[
            [130, 180, 62],
            [282, 236, 48],
            [176, 352, 54],
            [318, 400, 34],
          ].map(([cx, cy, r]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r={r} style={ns} />
              <circle cx={cx} cy={cy} r={r! * 0.68} style={ns} strokeOpacity="0.6" />
            </g>
          ))}
          <line x1="80" y1="268" x2="96" y2="300" style={ns} />
          <line x1="236" y1="300" x2="252" y2="330" style={ns} />
        </svg>
      );
    case "window":
      return (
        <svg {...common}>
          <polygon points="150,90 250,90 420,520 300,520" fill="currentColor" fillOpacity="0.16" stroke="none" />
          <rect x="120" y="90" width="160" height="290" style={ns} />
          <line x1="200" y1="90" x2="200" y2="380" style={ns} />
          <line x1="120" y1="200" x2="280" y2="200" style={ns} />
          <line x1="100" y1="380" x2="300" y2="380" style={ns} strokeOpacity="0.7" />
        </svg>
      );
    default:
      return null;
  }
}
