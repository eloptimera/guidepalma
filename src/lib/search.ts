/**
 * Klientsäker sökning — importerar ingen data, så att innehållet inte hamnar i JS-bundlen.
 * Indexet byggs på servern (buildSearchIndex i content.ts) och skickas in som prop.
 * Byt mot Algolia/Typesense/Meilisearch när innehållet växer.
 */
import type { SearchDoc } from "@/types";

const SYNONYMS: Record<string, string[]> = {
  kids: ["family friendly", "family", "children"],
  children: ["family friendly"],
  family: ["family friendly"],
  romantic: ["romantic", "date", "couples", "special occasion"],
  date: ["romantic"],
  dinner: ["restaurant", "restaurants"],
  boat: ["boat", "sail", "yacht", "catamaran", "llaüt", "on the water"],
  sailing: ["boat", "sail"],
  breakfast: ["breakfast", "brunch", "coffee", "bakery", "ensaïmada"],
  brunch: ["breakfast", "brunch"],
  drinks: ["bar", "cocktails", "wine", "rooftop"],
  cheap: ["budget", "cheap eats"],
  beach: ["beach", "beach club", "swim"],
  sunset: ["sunset", "golden hour"],
};

/** Enkel, deterministisk ranking: titelträff > taggträff > fritext. Körs på klienten. */
export function searchDocs(docs: SearchDoc[], query: string): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter((w) => w.length > 1 && !["with", "for", "the", "and", "to", "in", "things", "do"].includes(w));
  const expanded = words.flatMap((w) => [w, ...(SYNONYMS[w] ?? [])]);
  const scored = docs
    .map((d) => {
      const title = d.title.toLowerCase();
      const text = d.text.toLowerCase();
      let s = 0;
      if (title.includes(q)) s += 10;
      for (const w of expanded) {
        if (title.includes(w)) s += 4;
        if (text.includes(w)) s += 1.5;
      }
      if (q.includes("things to do") && d.href.startsWith("/things-to-do")) s += 3;
      return { d, s };
    })
    .filter((x) => x.s > 0)
    // Sponsrade får ALDRIG ranking-bonus i organiska resultat; de visas separat och märkta.
    .sort((a, b) => b.s - a.s);
  return scored.map((x) => x.d);
}
