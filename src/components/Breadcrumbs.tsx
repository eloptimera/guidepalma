import Link from "next/link";
import { getCity } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  href: string;
}

/** Synliga brödsmulor + BreadcrumbList-schema i ett. Första smulan (Home) läggs till automatiskt. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: getCity().name, href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="crumbs">
          {all.map((c, i) => (
            <li key={c.href}>
              {i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
