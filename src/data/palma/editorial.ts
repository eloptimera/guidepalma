import type {
  Article,
  Author,
  CityEvent,
  Neighbourhood,
  SponsoredPlacement,
  TopList,
} from "@/types";

/**
 * Redaktionellt innehåll för Palma.
 *
 * Ärlighetsregler (gäller tills redaktionen besökt platserna):
 * - Listor är urval och sorteringar med uttalad metod — inte redaktionella rankningar.
 * - Inga påhittade skribenter: allt signeras "Guide Palma Editors" tills riktiga personer skriver.
 * - Inga sponsrade placeringar förrän det finns avtal (sponsoredPlacements är tom).
 * - Inga påhittade event — "This week in Palma" visas först när riktiga event läggs in.
 */

const editors: Author = { name: "Guide Palma Editors", role: "Guide Palma" };
const UPDATED = "2026-11-01";

/* ================================================================ NEIGHBOURHOODS */

export const neighbourhoods: Neighbourhood[] = [
  {
    slug: "santa-catalina",
    citySlug: "palma",
    name: "Santa Catalina",
    tagline: "The old fishermen's quarter west of the Old Town, built around its covered market.",
    intro: [
      "Santa Catalina grew up as Palma's fishermen's and sailors' quarter, just outside the old city walls. Its low houses, green shutters and covered market still give it a neighbourhood feel, and in recent years it has become one of the city's main areas for eating and drinking out.",
      "The Es Baluard museum sits on the old bastion at its edge, and the marina is a few minutes' walk away.",
    ],
    heroImage: {
      alt: "Green shutters and café tables on a pedestrian street",
      tone: "terracotta",
      motif: "shutters",
      brief: "Carrer de Fàbrica, early evening, tables filling, warm light",
    },
    facts: [
      { label: "Walk to cathedral", value: "15 min" },
      { label: "Heart", value: "The market" },
      { label: "Vibe", value: "Lively" },
    ],
    bestFor: ["Food lovers", "Evenings out", "Art"],
    sections: [
      { category: "restaurants", title: "Restaurants" },
      { category: "bars", title: "Rooftop bars" },
      { category: "things-to-do", title: "Things to do" },
      { category: "sights", title: "Sights" },
    ],
    seo: {
      title: "Santa Catalina, Palma — Neighbourhood Guide",
      description: "Santa Catalina neighbourhood guide: restaurants, rooftop bars, food tours and Es Baluard museum in Palma's former fishermen's quarter.",
    },
  },
  {
    slug: "old-town",
    citySlug: "palma",
    name: "Old Town",
    tagline: "Cathedral, royal palace and a maze of sandstone lanes.",
    intro: [
      "Palma's Casc Antic is where most sightseeing happens: the cathedral and the Almudaina palace on the sea wall, the Arab Baths, the Olivar market and narrow streets of noble houses with hidden courtyards. It is also home to three of the city's Michelin-starred restaurants and several hotel rooftops.",
    ],
    heroImage: { alt: "Narrow sandstone street with a gothic arch", tone: "stone", motif: "arch" },
    facts: [
      { label: "Must see", value: "La Seu" },
      { label: "Best time", value: "Early morning" },
      { label: "Vibe", value: "Historic" },
    ],
    bestFor: ["First visit", "History", "Fine dining"],
    sections: [
      { category: "sights", title: "Sights" },
      { category: "restaurants", title: "Restaurants" },
      { category: "bars", title: "Rooftop bars" },
      { category: "things-to-do", title: "Things to do" },
      { category: "private-guides", title: "Private guides" },
    ],
    seo: {
      title: "Palma Old Town Guide — Sights, Restaurants & Rooftops",
      description: "Palma's Old Town: the cathedral, Almudaina palace, Michelin-starred restaurants, rooftop bars and guided tours.",
    },
  },
  {
    slug: "la-lonja",
    citySlug: "palma",
    name: "La Lonja",
    tagline: "The old merchants' quarter between the Born and the marina.",
    intro: ["The streets around the Gothic Llotja exchange run down to the waterfront. It is a busy area in the evening, and the marina at its edge is where several boat trips depart."],
    heroImage: { alt: "Gothic exchange building at night", tone: "night", motif: "arch" },
    facts: [
      { label: "Landmark", value: "Sa Llotja" },
      { label: "Busy from", value: "Evening" },
      { label: "Vibe", value: "Lively" },
    ],
    bestFor: ["Evenings out", "Boat trips"],
    sections: [
      { category: "bars", title: "Rooftop bars" },
      { category: "boat-trips", title: "Boat trips from La Lonja" },
      { category: "things-to-do", title: "Things to do" },
      { category: "private-guides", title: "Private tours" },
    ],
    seo: { title: "La Lonja, Palma — Neighbourhood Guide", description: "Rooftop bars, boat trips and food tours in La Lonja, Palma." },
  },
  {
    slug: "portixol",
    citySlug: "palma",
    name: "Portixol",
    tagline: "A small fishing harbour on the seafront east of the cathedral.",
    intro: ["About half an hour's walk east along the seafront, Portixol and neighbouring Es Molinar have a harbour of small boats, a promenade and a beach — a seaside feel within the city."],
    heroImage: { alt: "Small harbour with fishing boats", tone: "sea", motif: "horizon" },
    facts: [
      { label: "From centre", value: "30 min walk" },
      { label: "Swim", value: "Yes" },
      { label: "Vibe", value: "Seaside" },
    ],
    bestFor: ["Seaside dinner", "Beach"],
    sections: [
      { category: "restaurants", title: "Restaurants" },
      { category: "beach-clubs", title: "Beach" },
    ],
    seo: { title: "Portixol, Palma — Seafront Neighbourhood Guide", description: "Where to eat and swim in Portixol, Palma." },
  },
  {
    slug: "el-terreno",
    citySlug: "palma",
    name: "El Terreno",
    tagline: "Hillside villas and pine woods below Bellver Castle.",
    intro: ["El Terreno climbs the hill west of the centre towards Bellver Castle. Once popular with artists and writers, it is now mainly residential, with paths up through the pine woods to the castle."],
    heroImage: { alt: "Hillside villas among pine trees", tone: "olive", motif: "sun" },
    facts: [
      { label: "Must see", value: "Bellver Castle" },
      { label: "Vibe", value: "Residential" },
      { label: "Walk to centre", value: "25 min" },
    ],
    bestFor: ["Views", "Walks"],
    sections: [{ category: "sights", title: "Sights" }],
    seo: { title: "El Terreno, Palma — Neighbourhood Guide", description: "Bellver Castle and the hillside streets of El Terreno, Palma." },
  },
];

/* ================================================================ LISTS */

export const topLists: TopList[] = [
  {
    slug: "best-restaurants-palma",
    citySlug: "palma",
    category: "restaurants",
    title: "Michelin-Recognised Restaurants in Palma",
    shortTitle: "Michelin-Recognised Restaurants",
    dek: "Every restaurant in the city of Palma listed in the Michelin Guide — three with a star.",
    intro: [
      "The Michelin Guide recognises fifteen restaurants within the municipality of Palma. Three hold a Michelin star: Marc Fosh, DINS Santi Taura and Zaranda, all in or beside the Old Town.",
      "This list is ordered by Michelin distinction, then alphabetically. It is a starting point, not our ranking — we'll publish our own verdicts as we visit.",
    ],
    heroImage: {
      alt: "Long dinner table in a stone courtyard",
      tone: "dusk",
      motif: "table",
      brief: "Courtyard dinner, overhead, candlelight",
    },
    sponsorBreaks: [],
    items: [
      { placeSlug: "dins-santi-taura", note: "One Michelin star. Santi Taura's restaurant beside Parc de la Mar, in the El Llorenç building.", bestFor: "Mallorcan cuisine", layout: "feature" },
      { placeSlug: "marc-fosh", note: "One Michelin star. Modern cooking rooted in Mallorcan produce, on Carrer de la Missió.", bestFor: "Tasting menu", layout: "split" },
      { placeSlug: "zaranda", note: "One Michelin star. Creative cooking inside the Es Princep hotel.", bestFor: "Special occasion", layout: "split" },
      { placeSlug: "aromata", note: "Marked by Michelin as an inspectors' favourite. Contemporary cooking in central Palma.", bestFor: "Lunch", layout: "split" },
      { placeSlug: "adrian-quetglas", note: "Modern cuisine on Passeig de Mallorca.", bestFor: "Tasting menu", layout: "compact" },
      { placeSlug: "barbar", note: "Mediterranean cooking near the Born.", bestFor: "Dinner in the centre", layout: "compact" },
      { placeSlug: "la-bodeguilla", note: "Traditional Spanish cooking, open every day.", bestFor: "Traditional food", layout: "compact" },
      { placeSlug: "la-vieja", note: "Creative cooking on Plaça de Raimundo Clar.", bestFor: "Creative cooking", layout: "compact" },
      { placeSlug: "little-jarana", note: "International and Mediterranean, open Monday to Wednesday evenings.", bestFor: "Early-week dinner", layout: "compact" },
      { placeSlug: "mombo", note: "Traditional cooking on Passeig de Mallorca.", bestFor: "Traditional food", layout: "compact" },
      { placeSlug: "oseo", note: "Modern Mediterranean in Es Secar de la Real, north of the centre.", bestFor: "Worth the taxi", layout: "compact" },
      { placeSlug: "periplo-portixol", note: "Mediterranean cooking on the Portixol seafront.", bestFor: "Seaside dinner", layout: "split" },
      { placeSlug: "quadrat", note: "The restaurant of Sant Francesc Hotel Singular.", bestFor: "Old Town dinner", layout: "compact" },
      { placeSlug: "stagier-bar", note: "Modern fusion, open weekdays.", bestFor: "Weekday dinner", layout: "compact" },
      { placeSlug: "sumaq", note: "Peruvian cooking in Pere Garau.", bestFor: "Peruvian food", layout: "compact" },
    ],
    methodology:
      "Source: Michelin Guide, checked 1 November 2026. Ordered by distinction, then alphabetically. Not an editorial ranking. No restaurant has paid to appear.",
    author: editors,
    updatedAt: UPDATED,
  },
  {
    slug: "best-rooftop-bars-palma",
    citySlug: "palma",
    category: "bars",
    title: "Rooftop Bars in Palma",
    shortTitle: "Rooftop Bars",
    dek: "Hotel rooftops with cathedral, city and sea views — from the Old Town to Santa Catalina.",
    intro: ["Most of Palma's rooftop bars sit on top of boutique hotels. Several are seasonal or limit access for non-guests, so check before you go."],
    heroImage: { alt: "Rooftop at golden hour", tone: "dusk", motif: "sun" },
    sponsorBreaks: [],
    items: [
      { placeSlug: "el-llorenc-rooftop", note: "Faces the cathedral across Parc de la Mar.", bestFor: "Cathedral views", layout: "feature" },
      { placeSlug: "almaq-rooftop-es-princep", note: "Above the Es Princep hotel near the old sea walls.", bestFor: "Sunset", layout: "split" },
      { placeSlug: "sky-bar-hostal-cuba", note: "On a modernista landmark at the start of Santa Catalina.", bestFor: "Santa Catalina evening", layout: "split" },
      { placeSlug: "sky-area-hotel-almudaina", note: "Eighth floor above Avinguda Jaume III.", bestFor: "City views", layout: "compact" },
      { placeSlug: "cuit-nakar-hotel", note: "Restaurant and bar on the eighth floor, rooftop above.", bestFor: "Dinner with a view", layout: "compact" },
      { placeSlug: "purohotel-rooftop", note: "Summer rooftop in La Lonja.", bestFor: "Summer nights", layout: "compact" },
      { placeSlug: "terracotta-antigua-palma", note: "Fourth-floor hotel rooftop in the Old Town.", bestFor: "Old Town drinks", layout: "compact" },
    ],
    methodology: "Compiled from the hotels' own websites and The Rooftop Guide, checked 1 November 2026. Not an editorial ranking.",
    author: editors,
    updatedAt: UPDATED,
  },
  {
    slug: "best-beach-clubs-palma",
    citySlug: "palma",
    category: "beach-clubs",
    title: "Beach Clubs in and near Palma",
    shortTitle: "Beach Clubs",
    dek: "One on the city seafront, the rest a short drive west in Calvià and Andratx.",
    intro: ["Palma's own seafront has few beach clubs; most are along the coast to the west, in Illetes, Portals and Andratx. All are seasonal."],
    heroImage: { alt: "Loungers above turquoise water", tone: "sea", motif: "waves" },
    sponsorBreaks: [],
    items: [
      { placeSlug: "anima-beach", note: "The option within the city, on the seafront towards Portixol. Check status before visiting.", bestFor: "No car needed", layout: "split" },
      { placeSlug: "balneario-illetas", note: "Beach club, restaurant and spa in Illetes.", bestFor: "Spa and beach", layout: "split" },
      { placeSlug: "purobeach-illetas", note: "Puro Group's Illetes club.", bestFor: "Sunset", layout: "compact" },
      { placeSlug: "um-beach-house", note: "Near Puerto Portals.", bestFor: "Portals day", layout: "compact" },
      { placeSlug: "gran-folies", note: "Pool and restaurant above Cala Llamp near Port d'Andratx. Reopens 2027.", bestFor: "Day trip west", layout: "compact" },
    ],
    methodology: "Compiled from the clubs' own websites and mallorca.com, checked 1 November 2026. Not an editorial ranking.",
    author: editors,
    updatedAt: UPDATED,
  },
  {
    slug: "best-things-to-do-palma",
    citySlug: "palma",
    category: "things-to-do",
    title: "10 Things to Do in Palma",
    shortTitle: "10 Things to Do",
    dek: "The essential sights and experiences, with prices and how to book.",
    intro: ["A mix of Palma's main sights and well-reviewed experiences, chosen to cover history, food and time on the water."],
    heroImage: { alt: "Old Town street with shutters", tone: "sand", motif: "shutters" },
    sponsorBreaks: [],
    items: [
      { placeSlug: "palma-cathedral", note: "Gaudí's canopy and Barceló's chapel inside Palma's Gothic landmark.", bestFor: "First visit", layout: "feature" },
      { placeSlug: "sail-palma-sunset-catamaran", note: "Two hours on the bay at sunset.", bestFor: "Couples", layout: "split" },
      { placeSlug: "tren-de-soller", note: "The 1912 train over the mountains to Sóller.", bestFor: "Day out", layout: "split" },
      { placeSlug: "bellver-castle", note: "Circular castle with the widest view of the bay.", bestFor: "Views", layout: "compact" },
      { placeSlug: "almudaina-palace", note: "The royal palace beside the cathedral.", bestFor: "History", layout: "compact" },
      { placeSlug: "mercat-olivar", note: "Palma's main food market.", bestFor: "Foodies", layout: "compact" },
      { placeSlug: "moltak-cooking-class", note: "Five-course hands-on cooking class.", bestFor: "Rainy day", layout: "compact" },
      { placeSlug: "avinae-wine-experience", note: "Mallorcan wine tasting in the Old Town.", bestFor: "Wine lovers", layout: "compact" },
      { placeSlug: "es-baluard", note: "Contemporary art on the old city bastion.", bestFor: "Art", layout: "compact" },
      { placeSlug: "el-nino-kayak-tour", note: "Guided morning kayak from Can Pastilla.", bestFor: "Early risers", layout: "compact" },
    ],
    methodology: "A selection to cover different interests. Prices from official or booking sites, checked 1 November 2026. Ratings are shown with their source.",
    author: editors,
    updatedAt: UPDATED,
  },
  {
    slug: "best-boat-trips-palma",
    citySlug: "palma",
    category: "boat-trips",
    title: "Boat Trips from Palma",
    shortTitle: "Boat Trips",
    dek: "Shared sunset sails, small-group catamarans and private yachts.",
    intro: ["Boat trips leave from three places in the city: the La Lonja marina, Club de Mar and the Real Club Náutico on Paseo Marítimo."],
    heroImage: { alt: "Sails at sunset", tone: "sea", motif: "horizon" },
    sponsorBreaks: [],
    items: [
      { placeSlug: "sail-palma-sunset-catamaran", note: "Two-hour shared sunset cruise from La Lonja.", bestFor: "Sunset", layout: "feature" },
      { placeSlug: "sail-palma-luxury-catamaran", note: "Four hours, max 10–12 guests, with tapas.", bestFor: "Small groups", layout: "split" },
      { placeSlug: "midday-sunset-sailing-open-bar", note: "Four hours from Club de Mar with open bar.", bestFor: "Half day", layout: "split" },
      { placeSlug: "magic-catamarans-bay-of-palma", note: "Five hours with barbecue and snorkelling.", bestFor: "Families", layout: "compact" },
      { placeSlug: "sailin-palma-private-half-day", note: "Private sailing boat for up to eight.", bestFor: "Private group", layout: "compact" },
      { placeSlug: "ib-yachting-classic-yacht", note: "Classic yacht with skipper for up to eleven.", bestFor: "Celebrations", layout: "compact" },
    ],
    methodology: "Shared trips first, then private charters. Ratings and prices from the booking platforms named, checked 1 November 2026.",
    author: editors,
    updatedAt: UPDATED,
  },
];

/* ================================================================ SPONSORSHIP */

/** Tom tills det finns signerade partneravtal. Se src/types SponsoredPlacement för formatet. */
export const sponsoredPlacements: SponsoredPlacement[] = [];

/* ================================================================ ARTICLES */

export const articles: Article[] = [
  {
    slug: "palma-in-48-hours",
    citySlug: "palma",
    title: "Palma in 48 Hours",
    dek: "A two-day plan: the Old Town on day one, the mountains and the sea on day two.",
    kicker: "Itinerary",
    author: editors,
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    readingMinutes: 6,
    heroImage: {
      alt: "Morning light on the cathedral from the sea wall",
      tone: "morning",
      motif: "horizon",
      brief: "Parc de la Mar, 8 a.m., the cathedral glowing",
    },
    body: [
      { type: "p", text: "Palma is compact enough to see its highlights in two days, but it rewards an unhurried pace. This plan puts the sights in the morning, leaves the hottest hours free, and saves the evenings for rooftops and dinner." },
      { type: "p", text: "Opening hours change with the season. The times below suit the winter timetable (November–March); in summer, many places open later in the evening." },
      { type: "h2", text: "Day one: the Old Town" },
      {
        type: "timeline",
        items: [
          { time: "10:00", title: "Palma Cathedral", text: "Arrive at opening. Inside, look for Gaudí's canopy and Barceló's ceramic chapel.", placeSlug: "palma-cathedral" },
          { time: "11:30", title: "The Royal Palace next door", text: "The Almudaina palace is beside the cathedral; guided visits take about an hour.", placeSlug: "almudaina-palace" },
          { time: "13:00", title: "Arab Baths and the Old Town lanes", text: "A short walk through the old streets to one of the few remains of Islamic Palma.", placeSlug: "arab-baths" },
          { time: "18:00", title: "Rooftop at golden hour", text: "The rooftop at El Llorenç faces the cathedral across Parc de la Mar.", placeSlug: "el-llorenc-rooftop" },
          { time: "20:30", title: "Dinner downstairs", text: "DINS Santi Taura, in the same building, holds a Michelin star. Book well ahead.", placeSlug: "dins-santi-taura" },
        ],
      },
      { type: "pullquote", text: "Put the sights in the morning and save the evenings for the rooftops." },
      { type: "image", media: { alt: "Shuttered street in the afternoon", tone: "sand", motif: "shutters" }, caption: "The Old Town in the quiet early afternoon.", wide: true },
      { type: "h2", text: "Day two: mountains and sea" },
      { type: "p", text: "Start at the Olivar market, then take the historic train over the Tramuntana to Sóller. Return in time for an evening on the water." },
      { type: "place", placeSlug: "mercat-olivar", note: "Palma's main food market, near Plaça d'Espanya." },
      { type: "place", placeSlug: "tren-de-soller", note: "The 1912 train leaves from beside Plaça d'Espanya." },
      { type: "tip", title: "Timetable change", text: "The Sóller train runs on a new timetable from 2 November 2026 — check departures on the official site before you go." },
      { type: "place", placeSlug: "sail-palma-sunset-catamaran", note: "If the season allows: two hours on the bay at sunset." },
      { type: "p", text: "End with dinner by the sea in Portixol, a walk east along the seafront promenade." },
      { type: "place", placeSlug: "periplo-portixol", note: "Mediterranean cooking on the Portixol seafront." },
    ],
    relatedPlaces: ["palma-cathedral", "el-llorenc-rooftop", "tren-de-soller", "sail-palma-sunset-catamaran", "periplo-portixol"],
    seo: {
      title: "Palma in 48 Hours: A Two-Day Itinerary",
      description: "How to spend 48 hours in Palma de Mallorca: the cathedral, royal palace, rooftops, the Sóller train and dinner by the sea.",
    },
  },
  {
    slug: "best-places-for-sunset",
    citySlug: "palma",
    title: "Where to Watch the Sunset in Palma",
    dek: "A castle on a hill, hotel rooftops and the bay itself.",
    kicker: "Guide",
    author: editors,
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    readingMinutes: 4,
    heroImage: { alt: "Sun setting over the bay", tone: "dusk", motif: "sun" },
    body: [
      { type: "p", text: "Palma faces south-west across its bay, so the sun sets over the water and the hills of Calvià. Any high point or seafront spot gets a good view." },
      { type: "place", placeSlug: "bellver-castle", note: "The highest viewpoint over the bay. Check closing times — earlier in winter." },
      { type: "place", placeSlug: "el-llorenc-rooftop", note: "Rooftop facing the cathedral." },
      { type: "place", placeSlug: "sky-bar-hostal-cuba", note: "Rooftop at the start of Santa Catalina." },
      { type: "place", placeSlug: "sail-palma-sunset-catamaran", note: "Watch it from the water." },
      { type: "place", placeSlug: "periplo-portixol", note: "Dinner on the Portixol seafront afterwards." },
    ],
    relatedPlaces: ["bellver-castle", "el-llorenc-rooftop", "sky-bar-hostal-cuba"],
    seo: { title: "Where to Watch the Sunset in Palma", description: "The best sunset spots in Palma de Mallorca: Bellver Castle, rooftop bars and sunset sails." },
  },
  {
    slug: "santa-catalina-guide",
    citySlug: "palma",
    title: "A Day in Santa Catalina",
    dek: "Art on the bastion, a cooking class, a food tour and a rooftop to finish.",
    kicker: "Neighbourhood",
    author: editors,
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    readingMinutes: 4,
    heroImage: { alt: "Santa Catalina street", tone: "terracotta", motif: "shutters" },
    body: [
      { type: "p", text: "Santa Catalina sits just west of the Old Town, between the old city walls and the Paseo Marítimo. Everything below is within a fifteen-minute walk." },
      { type: "place", placeSlug: "es-baluard", note: "Start with contemporary art on the old bastion." },
      { type: "place", placeSlug: "moltak-cooking-class", note: "A hands-on five-course cooking class." },
      { type: "place", placeSlug: "withlocals-10-tastings", note: "Or a private food tour starting on Carrer de Sant Magí." },
      { type: "place", placeSlug: "sky-bar-hostal-cuba", note: "Rooftop drinks at sunset." },
      { type: "place", placeSlug: "little-jarana", note: "Dinner, if it's Monday to Wednesday." },
    ],
    relatedPlaces: ["es-baluard", "moltak-cooking-class", "sky-bar-hostal-cuba"],
    seo: { title: "A Day in Santa Catalina, Palma", description: "How to spend a day in Santa Catalina, Palma: Es Baluard, cooking classes, food tours and a rooftop bar." },
  },
];

/* ================================================================ EVENTS */

/** Tom tills riktiga event finns (CMS / kommunens kalender). Sektionen döljs automatiskt. */
export const events: CityEvent[] = [];
