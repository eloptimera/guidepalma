import { PinIcon } from "./Icons";

/**
 * Kartplaceholder i sajtens stil (ingen tung kartbiblioteks-JS).
 * Länkar till Google Maps med koordinaterna. Byt mot Mapbox/Google statisk karta när API-nyckel finns.
 */
export function MapCard({ query, label }: { query: string; label: string }) {
  const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  return (
    <a className="map" href={href} target="_blank" rel="noopener" aria-label={`Open ${label} in Google Maps`}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="400" height="300" fill="#e9e1d2" />
        <path d="M0 210 C 70 196, 120 232, 190 222 S 300 250, 400 236 V300 H0 Z" fill="#b9cfd0" />
        <path d="M0 210 C 70 196, 120 232, 190 222 S 300 250, 400 236" fill="none" stroke="#9fb9ba" strokeWidth="1" />
        <g stroke="#d7cbb5" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M20 40 L 380 70" />
          <path d="M40 150 L 360 120" />
          <path d="M120 0 L 150 210" />
          <path d="M260 0 L 240 220" />
        </g>
        <g stroke="#dfd4c1" strokeWidth="2.5" fill="none">
          <path d="M60 0 L 80 200" />
          <path d="M200 10 L 196 216" />
          <path d="M320 0 L 330 230" />
          <path d="M0 100 L 400 92" />
          <path d="M0 180 L 400 168" />
        </g>
        <circle cx="200" cy="130" r="38" fill="#b4553a" fillOpacity="0.12" />
      </svg>
      <span style={{ position: "absolute", left: "50%", top: "43%", transform: "translate(-50%,-100%)", color: "var(--terracotta)" }}>
        <PinIcon size={34} />
      </span>
      <span className="map-label">Open in Maps ↗</span>
    </a>
  );
}
