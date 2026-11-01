"use client";

import { useState } from "react";

/**
 * Leadformulär (yacht charter, privata guider). Intäktsmodell: lead generation.
 * TODO: POST till /api/leads → CRM/e-post till partnern. Just nu sparas inget.
 */
export function LeadForm({ placeName }: { placeName: string }) {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <p role="status" className="h4">
        Thank you. We&rsquo;ll pass your request to {placeName} and reply within a day.
      </p>
    );
  return (
    <form
      id="enquire"
      className="enquiry"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label>
        Name
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Date
        <input name="date" type="date" />
      </label>
      <label>
        Group size
        <select name="size" defaultValue="2">
          {["1", "2", "3–4", "5–8", "9+"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label>
        Anything we should know?
        <textarea name="message" />
      </label>
      <button className="btn btn-solid" type="submit">
        Send enquiry
      </button>
      <p className="affiliate-note">We share your details only with {placeName}.</p>
    </form>
  );
}
