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
  { slug: "paseo-maritimo", name: "Paseo Marítimo", hasPage: false },
  { slug: "bay-of-palma", name: "Bay of Palma", hasPage: false },
  { slug: "tramuntana", name: "Serra de Tramuntana", hasPage: false },
];

export const categories: Category[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    singular: "Restaurant",
    navGroup: "eat",
    title: "Where to eat in Palma",
    intro:
      "From whitewashed fishermen's bars in Portixol to tasting menus in old palace courtyards — the tables we would book for our own friends.",
    heroImage: {
      alt: "A long lunch table under a vine-covered pergola",
      tone: "terracotta",
      motif: "table",
      brief: "Overhead, shared plates, linen, late lunch shadows",
    },
    schemaType: "Restaurant",
    types: ["Mallorcan", "Seafood", "Tapas", "Fine dining", "Rooftop", "Vegetarian", "Cheap eats"],
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
    name: "Bars & Rooftops",
    singular: "Bar",
    navGroup: "drink",
    title: "Bars, rooftops & late nights",
    intro:
      "Vermut at noon, rooftops at golden hour, and the kind of small cocktail bar you only find if someone tells you.",
    heroImage: {
      alt: "Two glasses on a rooftop ledge overlooking terracotta roofs",
      tone: "dusk",
      motif: "sun",
      brief: "Rooftop, two glasses, cathedral out of focus behind",
    },
    schemaType: "BarOrPub",
    types: ["Rooftop", "Cocktails", "Wine bar", "Vermut", "Late night"],
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
    title: "Beach clubs worth the day",
    intro:
      "Not every beach club needs a DJ and a magnum. These are the ones with good food, good water and a reason to stay until sunset.",
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
      "Palma looks best from the water. Sunset sails, traditional llaüts and private charters to coves you cannot drive to.",
    heroImage: {
      alt: "A wooden sailing boat anchored in a quiet cove",
      tone: "sea",
      motif: "horizon",
      brief: "Wooden llaüt at anchor, aerial or high angle, turquoise cove",
    },
    schemaType: "TouristTrip",
    types: ["Sunset sail", "Private charter", "Day trip"],
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
      "Ten good days' worth of ideas — food tours, sunrise kayaks, mountain trains and the cooking class that is actually fun.",
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
      "The cathedral, the castle and the courtyards — with notes on when to go so you see them properly.",
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
    intro: "Local historians, food people and sailors who will show you their Palma.",
    heroImage: {
      alt: "A guide pointing up at carved stonework",
      tone: "olive",
      motif: "arch",
      brief: "Guide and two guests looking up, Old Town doorway",
    },
    schemaType: "LocalBusiness",
    types: ["History", "Food", "Architecture"],
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
    tags: ["Romantic", "Sunset", "Sea view"],
    image: { alt: "Candle on a courtyard table", tone: "dusk", motif: "arch" },
  },
  {
    slug: "local",
    label: "Local",
    line: "Where Palma actually eats and drinks",
    tags: ["Local favourite"],
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
    line: "From vermut hour to the last bar",
    tags: ["Late night", "Cocktails"],
    image: { alt: "Cocktail bar counter", tone: "night", motif: "sun" },
  },
  {
    slug: "beach-day",
    label: "Beach day",
    line: "Calm water, long lunches, no rush",
    tags: ["Beach", "On the water"],
    image: { alt: "Turquoise cove", tone: "sea", motif: "waves" },
  },
];
