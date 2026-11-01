type P = { size?: number; className?: string };

const base = (size = 16) =>
  ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  }) as const;

export const ArrowRight = ({ size, className }: P) => (
  <svg {...base(size)} className={`arrow ${className ?? ""}`}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const SearchIcon = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.8-4.8" />
  </svg>
);

export const CloseIcon = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const StarIcon = ({ size = 14, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
  </svg>
);

/** Märke för Featured Partner — en liten kompassros. */
export const PartnerMark = ({ size = 12, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
  </svg>
);

export const PinIcon = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const ClockIcon = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
