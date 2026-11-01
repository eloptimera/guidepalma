import Link from "next/link";

export default function NotFound() {
  return (
    <section className="cat-hero" style={{ minHeight: "70vh" }}>
      <div className="wrap">
        <p className="eyebrow text-terracotta">404</p>
        <h1 className="h1 mt-s" style={{ maxWidth: "14ch" }}>
          Even locals get lost <em>in the Old Town.</em>
        </h1>
        <p className="lead mt-s">That page doesn&rsquo;t exist — but plenty of good ones do.</p>
        <div className="cover-ctas">
          <Link href="/" className="btn btn-solid">
            Back to the guide
          </Link>
          <Link href="/search" className="btn btn-ghost">
            Search
          </Link>
        </div>
      </div>
    </section>
  );
}
