import type { Area, Category, City, Intent } from "@/types";

export const city: City = {
  slug: "palma",
  name: "Palma",
  brand: "Guide Palma",
  domain: "https://guidepalma.com",
  country: "Spain",
  region: "Mallorca",
  locale: "en_GB",
  currency: "EUR",
  timezone: "Europe/Madrid",
  tagline: "Palma, properly explored.",
  description:
    "The independent guide to Palma de Mallorca — the restaurants, bars, beaches, boats and quiet corners actually worth your time.",
  geo: { lat: 39.5696, lng: 2.6502 },
  heroImage: {
    alt: "Late sun on the limestone façade of Palma Cathedral above the bay",
    tone: "dusk",
    motif: "horizon",
    brief: "La Seu from Parc de la Mar, last light, water in foreground",
  },
  social: { instagram: "https://instagram.com/guidepalma" },
};

export const areas: Area[] = [
  { slug: "old-town", name: "Old Town", hasPage: true },
  { slug: "santa-catalina", name: "Santa Catalina", hasPage: true },
  { slug: "la-lonja", name: "La Lonja", hasPage: true },
  { slug: "portixol", name: "Portixol", hasPage: true },
  { slug: "el-terreno", name: "El Terreno", hasPage: true },
  { slug: "centre", name: "City Centre", hasPage: false },
  { slug: "paseo-mallorca", name: "Passeig de Mallorca", hasPage: false },
  { slug: "paseo-maritimo", name: "Paseo Marítimo", hasPage: false },
  { slug: "pere-garau", name: "Pere Garau", hasPage: false },
  { slug: "es-secar", name: "Es Secar de la Real", hasPage: false },
  { slug: "playa-de-palma", name: "Can Pastilla", hasPage: false },
  { slug: "palma", name: "Palma", hasPage: false },
  { slug: "calvia", name: "Calvià (west of Palma)", hasPage: false },
  { slug: "andratx", name: "Andratx", hasPage: false },
];

export const categories: Category[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    singular: "Restaurant",
    navGroup: "eat",
    title: "Where to eat in Palma",
    intro:
      "From Michelin-starred tasting menus in the Old Town to seafront dining in Portixol — every restaurant here is recognised by the Michelin Guide.",
    heroImage: {
      alt: "A long lunch table under a vine-covered pergola",
      tone: "terracotta",
      motif: "table",
      brief: "Overhead, shared plates, linen, late lunch shadows",
    },
    schemaType: "Restaurant",
    types: ["Modern Mallorcan", "Creative", "Modern", "Contemporary", "Mediterranean", "Traditional", "International", "Peruvian"],
    seo: {
      title: "Best Restaurants in Palma de Mallorca (2026 Guide)",
      description:
        "Where to eat in Palma: seafood in Portixol, tapas in La Lonja, tasting menus in the Old Town. Independently chosen, honestly described.",
    },
  },
  {
    slug: "breakfast-brunch",
    name: "Breakfast & Brunch",
    singular: "Café",
    navGroup: "eat",
    title: "Breakfast, brunch & coffee",
    intro:
      "Ensaïmadas still warm from the oven, proper flat whites, and terraces that catch the first sun.",
    heroImage: {
      alt: "Coffee and an ensaïmada on a marble café table",
      tone: "morning",
      motif: "table",
      brief: "Morning light, marble table, ensaïmada dusted with sugar",
    },
    schemaType: "CafeOrCoffeeShop",
    types: ["Coffee", "Brunch", "Bakery"],
    seo: {
      title: "Best Breakfast & Brunch in Palma",
      description: "The best cafés, bakeries and brunch spots in Palma de Mallorca.",
    },
  },
  {
    slug: "bars",
    name: "Rooftop Bars",
    singular: "Bar",
    navGroup: "drink",
    title: "Rooftop bars",
    intro:
      "Palma's hotel rooftops — cathedral views, sea views and the best seats for golden hour.",
    heroImage: {
      alt: "Two glasses on a rooftop ledge overlooking terracotta roofs",
      tone: "dusk",
      motif: "sun",
      brief: "Rooftop, two glasses, cathedral out of focus behind",
    },
    schemaType: "BarOrPub",
    types: ["Rooftop"],
    seo: {
      title: "Best Rooftop Bars & Cocktail Bars in Palma",
      description: "Rooftop bars, wine bars and late-night cocktail spots in Palma de Mallorca.",
    },
  },
  {
    slug: "beach-clubs",
    name: "Beach Clubs",
    singular: "Beach club",
    navGroup: "drink",
    title: "Beach clubs near Palma",
    intro:
      "From the city seafront to the coves of Illetes and Andratx — where to spend a long day by the water.",
    heroImage: {
      alt: "Sunbeds on a stone terrace above clear turquoise water",
      tone: "sea",
      motif: "waves",
      brief: "Stone terrace, two empty sunbeds, water like glass",
    },
    schemaType: "LocalBusiness",
    types: ["Relaxed", "Lively", "Family friendly"],
    seo: {
      title: "Best Beach Clubs in Palma de Mallorca",
      description: "The best beach clubs in and around Palma — from calm and grown-up to lively sunset sessions.",
    },
  },
  {
    slug: "boat-trips",
    name: "Boat Trips",
    singular: "Boat trip",
    navGroup: "do",
    title: "Boat trips & yacht charters",
    intro:
      "Palma looks best from the water. Sunset catamarans, small-group sails and private yachts from the city's marinas.",
    heroImage: {
      alt: "A wooden sailing boat anchored in a quiet cove",
      tone: "sea",
      motif: "horizon",
      brief: "Wooden llaüt at anchor, aerial or high angle, turquoise cove",
    },
    schemaType: "TouristTrip",
    types: ["Sunset sail", "Small group", "Day trip", "Private charter"],
    isExperience: true,
    seo: {
      title: "Best Boat Trips & Yacht Charters in Palma",
      description: "Sunset sails, catamaran trips and private yacht charters from Palma de Mallorca.",
    },
  },
  {
    slug: "things-to-do",
    name: "Things to Do",
    singular: "Experience",
    navGroup: "do",
    title: "Things to do in Palma",
    intro:
      "Food tours, wine tastings, bike tours, a morning kayak and the 1912 mountain train to Sóller.",
    heroImage: {
      alt: "Bicycles leaning against a sandstone wall in a narrow street",
      tone: "sand",
      motif: "shutters",
      brief: "Narrow Old Town street, green shutters, bicycles, soft shade",
    },
    schemaType: "TouristTrip",
    types: ["Tours", "Food & drink", "Outdoors", "Day trips", "Classes"],
    isExperience: true,
    seo: {
      title: "Things to Do in Palma de Mallorca — Tours, Activities & Day Trips",
      description:
        "The best things to do in Palma: food tours, bike tours, sailing, day trips to Sóller and more — with honest notes on what is worth it.",
    },
  },
  {
    slug: "sights",
    name: "Sights",
    singular: "Sight",
    navGroup: "see",
    title: "Sights & landmarks",
    intro:
      "The cathedral, the castle, the royal palace and the market — with prices and seasonal opening hours.",
    heroImage: {
      alt: "Gothic arches inside a stone courtyard",
      tone: "stone",
      motif: "arch",
      brief: "Stone arches, deep shade, a single slice of sun",
    },
    schemaType: "TouristAttraction",
    types: ["Landmark", "Museum", "Market", "Viewpoint"],
    seo: {
      title: "Palma Sights & Landmarks — What to See",
      description: "Palma Cathedral, Bellver Castle, Es Baluard and the sights worth your time, with the best times to visit.",
    },
  },
  {
    slug: "where-to-stay",
    name: "Where to Stay",
    singular: "Hotel",
    navGroup: "stay",
    title: "Where to stay in Palma",
    intro: "Small hotels with character, chosen neighbourhood by neighbourhood.",
    heroImage: {
      alt: "A hotel room with linen sheets and open wooden shutters",
      tone: "sand",
      motif: "window",
      brief: "Linen bed, shutters ajar, morning stripe of light",
    },
    schemaType: "LodgingBusiness",
    types: ["Boutique", "Sea view", "Old Town palace"],
    seo: {
      title: "Where to Stay in Palma — Best Boutique Hotels by Area",
      description: "The best boutique hotels in Palma de Mallorca and which neighbourhood suits you.",
    },
  },
  {
    slug: "private-guides",
    name: "Private Guides",
    singular: "Guide",
    navGroup: "do",
    title: "Private guides",
    intro: "Licensed local guides and small operators for private history, walking and food tours.",
    heroImage: {
      alt: "A guide pointing up at carved stonework",
      tone: "olive",
      motif: "arch",
      brief: "Guide and two guests looking up, Old Town doorway",
    },
    schemaType: "LocalBusiness",
    types: ["History", "Food"],
    isExperience: true,
    seo: {
      title: "Private Guides in Palma de Mallorca",
      description: "Hand-picked private guides in Palma for history, food and architecture.",
    },
  },
];

/** "Smart discovery" — vilken sorts Palma-dag planerar du? */
export const intents: Intent[] = [
  {
    slug: "romantic",
    label: "Romantic",
    line: "Candlelit courtyards and sunset sails",
    tags: ["Romantic", "Sunset"],
    image: { alt: "Candle on a courtyard table", tone: "dusk", motif: "arch" },
  },
  {
    slug: "local",
    label: "Local",
    line: "Markets, Mallorcan cooking and old Palma",
    tags: ["Traditional", "Market"],
    image: { alt: "Market stall with tomatoes", tone: "terracotta", motif: "shutters" },
  },
  {
    slug: "family",
    label: "Family",
    line: "Easy days that work for everyone",
    tags: ["Family friendly"],
    image: { alt: "Shallow water at a calm beach", tone: "morning", motif: "waves" },
  },
  {
    slug: "luxury",
    label: "Luxury",
    line: "Tasting menus, charters, the good table",
    tags: ["Special occasion", "Luxury"],
    image: { alt: "Yacht deck at golden hour", tone: "sand", motif: "horizon" },
  },
  {
    slug: "night-out",
    label: "Night out",
    line: "Rooftops at golden hour, cocktails after",
    tags: ["Rooftop", "Cocktails"],
    image: { alt: "Cocktail bar counter", tone: "night", motif: "sun" },
  },
  {
    slug: "beach-day",
    label: "Beach day",
    line: "Beach clubs and a day on the water",
    tags: ["Beach", "On the water"],
    image: { alt: "Turquoise cove", tone: "sea", motif: "waves" },
  },
];
