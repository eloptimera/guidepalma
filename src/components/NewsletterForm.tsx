"use client";

import { useState } from "react";

/** TODO: koppla till e-postleverantör (t.ex. Resend, Mailchimp, Klaviyo) via en route handler. */
export function NewsletterForm() {
  const [done, setDone] = useState(false);
  if (done)
    return (
      <p className="h4" role="status">
        Thank you — the next letter is on its way.
      </p>
    );
  return (
    <form
      className="letter-form"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <input id="nl-email" type="email" required placeholder="Your email address" autoComplete="email" />
      <button type="submit">Subscribe</button>
    </form>
  );
}
