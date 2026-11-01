# Guide Palma

Den oberoende digitala guiden till Palma de Mallorca — byggd som ett redaktionellt magasin med en konverteringsstark discovery-plattform under ytan.

**Stack:** Next.js 16 (App Router, statisk generering + ISR), React 19, TypeScript, ren CSS med designtokens. Typsnitt självhostade via Fontsource (Newsreader + Hanken Grotesk).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Sidor (första versionen)

| Route | Innehåll |
|---|---|
| `/` | Startsida: cover, Explore-mosaik, topplistor, Featured Partner, "What kind of day", Things to do, områden, This week, Stories, nyhetsbrev |
| `/[category]` | Kategorisida med filter (typ, område, pris, best for) — t.ex. `/restaurants`, `/things-to-do` |
| `/[category]/[slug]` | Antingen **topplista** (`/restaurants/best-restaurants-palma`) eller **platssida** (`/restaurants/casa-alzina`) |
| `/neighbourhoods/[slug]` | Områdessida, t.ex. `/neighbourhoods/santa-catalina` |
| `/guides/[slug]` | Artikel, t.ex. `/guides/palma-in-48-hours` |
| `/search` | Klientsök med synonymer ("kids" → family friendly) |
| `/about` | Redaktionell policy + hur sponsring fungerar |

## Arkitektur

```
src/types/          Domänmodell (Place, TopList, SponsoredPlacement, …)
src/data/<city>/    Mockdata per stad
src/data/index.ts   Stadsregister — CITY=lisbon bygger GuideLisbon från samma kod
src/lib/content.ts  ENDA vägen in till data. Byt implementation mot CMS här.
src/lib/seo.ts      Metadata + schema.org (Restaurant, TouristAttraction, ItemList, Article, Breadcrumb)
src/lib/search.ts   Klientsäker sökning (ingen data i JS-bundlen)
src/components/     UI. Komponenter läser aldrig src/data direkt.
```

## Sponsorsystem — reglerna i koden

- Placeringar definieras i `sponsoredPlacements` med `slot` (`home:featured`, `category:restaurants`, `toplist:<slug>`, `neighbourhood:<slug>`, `search`), datumfönster och prioritet.
- `getSponsored(slot)` returnerar bara aktiva placeringar (respekterar `startsAt/endsAt` och platsens `featuredUntil`).
- Sponsrat får **aldrig** rangnummer, placeras **mellan** rankade poster (`sponsorBreaks`), märks alltid "Featured Partner"/"Sponsored" och alla utgående länkar får `rel="sponsored"`.
- Partners syns inte under "Related" (redaktionellt) och får ingen bonus i organisk sökranking.

## Innan lansering

- [ ] **Riktiga foton.** Placeholders visar en fotobrief (`media.brief`) — använd den som shotlist. Lägg in `src` per bild.
- [ ] **Riktig data.** Restauranger/barer/hotell/turer är fiktiva (`isFictional: true`). Betyg är `source: "placeholder"` och visas som "demo" — de exponeras medvetet inte i schema.org.
- [ ] Verifiera öppettider/priser för sevärdheterna.
- [ ] Koppla nyhetsbrev- och leadformulär (`NewsletterForm`, `LeadForm`) till backend.
- [ ] Ersätt `#affiliate-…`/`#book` med riktiga spårade länkar.
- [ ] Byt kartplaceholder mot statisk karta (Mapbox/Google) när API-nyckel finns.
