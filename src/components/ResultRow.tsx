import Link from "next/link";
import type { SearchDoc } from "@/types";
import { PartnerMark } from "./Icons";
import { Photo } from "./Photo";

/** Sökträff. `promoted` = betald placering överst (egen ram + märkning). */
export function ResultRow({ doc, promoted }: { doc: SearchDoc; promoted?: boolean }) {
  return (
    <Link href={doc.href} className={`result zoom-parent${promoted ? " is-sponsored" : ""}`}>
      <div className="zoom">
        <Photo media={doc.image} sizes="120px" decorative />
      </div>
      <div className="stack-xs">
        {doc.isSponsored ? (
          <span className="partner-badge" style={{ height: 22, fontSize: "0.6rem", padding: "0 9px 0 8px" }}>
            <PartnerMark size={9} /> {promoted ? "Sponsored" : "Partner"}
          </span>
        ) : null}
        <p className="result-title">{doc.title}</p>
        <p className="meta">{doc.subtitle}</p>
      </div>
      <span className="eyebrow result-kind">{doc.kind === "place" ? "Place" : doc.kind}</span>
    </Link>
  );
}
