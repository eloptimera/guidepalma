/**
 * GuidePalma — domänmodell.
 *
 * Allt är skrivet för att vara stadsagnostiskt: Palma är första staden,
 * men samma typer ska bära GuideLisbon, GuideSeville, GuidePorto osv.
 * Mockdatan i src/data/<city>/ kan senare ersättas av ett CMS/databas
 * utan att komponenterna behöver ändras — de läser bara via src/lib/content.ts.
 */

/* ---------------------------------------------------------------- media */

/** Färgton för art-directed placeholder när riktigt foto saknas. */
export type Tone =
  | "sea"
  | "stone"
  | "terracotta"
  | "olive"
  | "sand"
  | "dusk"
  | "night"
  | "morning";

/** Grafiskt motiv i placeholder — varierar bilderna så att sidan inte blir monoton. */
export type Motif = "horizon" | "arch" | "shutters" | "sun" | "waves" | "table" | "window" | "none";

export interface Media {
  /** Riktig bild-URL eller /images/... Saknas den visas en art-directed placeholder. */
  src?: string;
  alt: string;
  tone: Tone;
  motif?: Motif;
  /** Bildbrief till fotografen — visas diskret på placeholdern tills fotot finns. */
  brief?: string;
  credit?: string;
  /** CSS object-position, t.ex. "50% 30%". */
  focal?: string;
}

/* ---------------------------------------------------------------- city */

export interface City {
  slug: string;
  name: string;
  /** Wordmark, t.ex. "Guide Palma". */
  brand: string;
  domain: string;
  country: string;
  region: string;
  locale: string;
  currency: string;
  timezone: string;
  tagline: string;
  description: string;
  geo: { lat: number; lng: number };
  heroImage: Media;
  social?: { instagram?: string; tiktok?: string };
}

/* ---------------------------------------------------------------- taxonomy */

export type NavGroup = "eat" | "drink" | "do" | "see" | "stay";

export type SchemaType =
  | "Restaurant"
  | "BarOrPub"
  | "CafeOrCoffeeShop"
  | "TouristAttraction"
  | "LodgingBusiness"
  | "LocalBusiness"
  | "TouristTrip";

export interface Category {
  slug: string;
  /** Kort namn i nav/chips. */
  name: string;
  /** Singular för etiketter: "Restaurant", "Boat trip". */
  singular: string;
  navGroup: NavGroup;
  /** H1 på kategorisidan. */
  title: string;
  intro: string;
  heroImage: Media;
  schemaType: SchemaType;
  /** Värden för typ-filtret. */
  types: string[];
  /** Är det här en "upplevelse" med varaktighet/pris från (aktiviteter, båtar)? */
  isExperience?: boolean;
  seo: { title: string; description: string };
}

export interface Area {
  slug: string;
  name: string;
  /** Har området en egen neighbourhood-sida? */
  hasPage: boolean;
}

export type PriceLevel = 1 | 2 | 3 | 4;

export interface Rating {
  value: number;
  count?: number;
  /** "placeholder" = demodata, får aldrig visas som en riktig Google-rating. */
  source: "google" | "editorial" | "placeholder";
}

/* ---------------------------------------------------------------- places */

export interface Place {
  id: string;
  slug: string;
  citySlug: string;
  /** Kategori-slug → styr URL: /<category>/<slug>. */
  category: string;
  /** Underkategori inom kategorin, t.ex. "Seafood", "Rooftop", "Sunset sail". */
  type: string;
  name: string;
  area: string;
  /** En mening — används i kort och listor. */
  summary: string;
  /** "Why we like it" — redaktionell text. */
  why: string[];
  goodToKnow: string[];
  perfectFor: string[];
  tags: string[];
  priceLevel: PriceLevel;
  rating?: Rating;
  images: Media[];
  address: string;
  phone?: string;
  website?: string;
  hours?: { days: string; time: string }[];
  geo?: { lat: number; lng: number };

  /** Upplevelser (aktiviteter, båtturer). */
  duration?: string;
  priceFrom?: number;

  /* -- monetisering ----------------------------------------------------- */
  /** Betalande partner. Styr ALDRIG redaktionell ranking — bara märkta placeringar. */
  isSponsored: boolean;
  /** Högre = visas först när flera sponsrade konkurrerar om samma slot. */
  sponsoredPriority?: number;
  /** ISO-datum. Efter detta datum visas inga sponsrade placeringar för platsen. */
  featuredUntil?: string;
  /** Direkt bokning hos verksamheten. */
  bookingUrl?: string;
  /** Spårad affiliatelänk (GetYourGuide, Viator, TheFork, Booking …). Får rel="sponsored". */
  affiliateUrl?: string;
  affiliatePartner?: string;
  /** Leadformulär (t.ex. yacht charter, privata guider) i stället för bokningslänk. */
  acceptsLeads?: boolean;

  /** Mockdata som inte motsvarar en verklig verksamhet. */
  isFictional: boolean;
}

/* ---------------------------------------------------------------- sponsorship */

/**
 * Var en sponsrad placering får synas. Formatet "<typ>:<slug>" gör det
 * möjligt att sälja exponering per sida utan att ändra komponenter.
 */
export type SlotKey =
  | "home:featured"
  | `category:${string}`
  | `toplist:${string}`
  | `neighbourhood:${string}`
  | `place-related:${string}`
  | "search";

export type SponsorLabel = "Featured Partner" | "Sponsored";

export interface SponsoredPlacement {
  id: string;
  placeSlug: string;
  slot: SlotKey;
  label: SponsorLabel;
  /** Rubrik ovanför partnern, t.ex. "Featured Restaurant". */
  eyebrow: string;
  /** Kort säljtext skriven av redaktionen i sajtens ton — inte annonsörens copy. */
  blurb?: string;
  startsAt: string;
  endsAt: string;
  priority: number;
}

/* ---------------------------------------------------------------- top lists */

export type ListItemLayout = "feature" | "split" | "compact";

export interface TopListItem {
  placeSlug: string;
  /** Listspecifik redaktionell text (skiljer sig från platsens allmänna summary). */
  note: string;
  bestFor: string;
  layout?: ListItemLayout;
}

export interface TopList {
  slug: string;
  citySlug: string;
  category: string;
  /** "The 10 Best Restaurants in Palma" */
  title: string;
  /** "10 Best Restaurants" — för kort på startsidan. */
  shortTitle: string;
  dek: string;
  intro: string[];
  heroImage: Media;
  /** Var i listan sponsrade interstitials får ligga (efter rank N). Rank påverkas aldrig. */
  sponsorBreaks: number[];
  items: TopListItem[];
  methodology: string;
  author: Author;
  updatedAt: string;
  area?: string;
}

/* ---------------------------------------------------------------- neighbourhoods */

export interface Neighbourhood {
  slug: string;
  citySlug: string;
  name: string;
  tagline: string;
  intro: string[];
  heroImage: Media;
  /** Snabbfakta. */
  facts: { label: string; value: string }[];
  bestFor: string[];
  /** Kategorier som visas som sektioner på områdessidan. */
  sections: { category: string; title: string }[];
  seo: { title: string; description: string };
}

/* ---------------------------------------------------------------- editorial */

export interface Author {
  name: string;
  role: string;
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "pullquote"; text: string }
  | { type: "image"; media: Media; caption?: string; wide?: boolean }
  | { type: "place"; placeSlug: string; note: string }
  | { type: "tip"; title: string; text: string }
  | {
      type: "timeline";
      title?: string;
      items: { time: string; title: string; text: string; placeSlug?: string }[];
    };

export interface Article {
  slug: string;
  citySlug: string;
  title: string;
  dek: string;
  kicker: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  heroImage: Media;
  body: ArticleBlock[];
  relatedPlaces: string[];
  seo: { title: string; description: string };
}

/* ---------------------------------------------------------------- events & discovery */

export interface CityEvent {
  id: string;
  citySlug: string;
  title: string;
  kind: "Market" | "Music" | "Festival" | "Art" | "Food" | "Sport";
  /** ISO-datum (YYYY-MM-DD). */
  date: string;
  time?: string;
  venue: string;
  area: string;
  description: string;
  isFree?: boolean;
  url?: string;
}

export interface Intent {
  slug: string;
  label: string;
  line: string;
  /** Taggar som matchar platser. */
  tags: string[];
  image: Media;
}

/* ---------------------------------------------------------------- search */

export interface SearchDoc {
  id: string;
  kind: "place" | "list" | "article" | "neighbourhood" | "category";
  title: string;
  subtitle: string;
  href: string;
  text: string;
  image: Media;
  isSponsored?: boolean;
}
