import type {
  Area,
  Article,
  Category,
  City,
  CityEvent,
  Intent,
  Neighbourhood,
  Place,
  SponsoredPlacement,
  TopList,
} from "@/types";
import * as palmaCity from "./palma/city";
import * as palmaEditorial from "./palma/editorial";
import { places as palmaPlaces } from "./palma/places";

/** Allt innehåll för en stad. Byt ut mot CMS-anrop när det är dags. */
export interface CityContent {
  city: City;
  areas: Area[];
  categories: Category[];
  intents: Intent[];
  places: Place[];
  neighbourhoods: Neighbourhood[];
  topLists: TopList[];
  articles: Article[];
  events: CityEvent[];
  sponsoredPlacements: SponsoredPlacement[];
}

const registry: Record<string, CityContent> = {
  palma: {
    city: palmaCity.city,
    areas: palmaCity.areas,
    categories: palmaCity.categories,
    intents: palmaCity.intents,
    places: palmaPlaces,
    neighbourhoods: palmaEditorial.neighbourhoods,
    topLists: palmaEditorial.topLists,
    articles: palmaEditorial.articles,
    events: palmaEditorial.events,
    sponsoredPlacements: palmaEditorial.sponsoredPlacements,
  },
  // lisbon: { ... }  ← GuideLisbon: lägg till src/data/lisbon/ och registrera här.
};

/**
 * Varje deploy serverar en stad (GuidePalma.com, GuideLisbon.com …).
 * Sätt CITY=lisbon i miljön för att bygga en annan stad från samma kodbas.
 */
export const CURRENT_CITY = process.env.CITY ?? "palma";

export function getCityContent(slug: string = CURRENT_CITY): CityContent {
  const content = registry[slug];
  if (!content) throw new Error(`Unknown city "${slug}". Register it in src/data/index.ts.`);
  return content;
}
