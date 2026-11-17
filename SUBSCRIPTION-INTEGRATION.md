# Subscription signup integration

Pricing reads the backend public plan catalog. Plan price IDs survive signup
navigation. The public Custom card submits `/subscription-enquiries`; negotiated
tenant plans are never displayed. Successful submission means queued for delivery,
not confirmation that an email has been delivered.

Plan signup collects country, active employees, billing contact/email/address,
optional tax ID, and separate Terms/DPA acceptance. NG uses NGN/Paystack; other
countries use USD/Stripe. Seat caps and currency are checked in the UI and backend.
Company and billing form drafts survive reloads within the same browser session;
legal acceptance is intentionally requested again. The selected plan remains in
the URL. Backend verification provisions the company and persists billing details.

Set these build-time variables when the approved documents are available:

```dotenv
VITE_TERMS_URL=<published Terms of Service URL>
VITE_DPA_URL=<published Data Processing Agreement URL>
VITE_TERMS_VERSION=<approved terms version identifier>
VITE_DPA_VERSION=<approved DPA version identifier>
```

When a document URL or version is missing, signup displays a pending-publication
acknowledgment and records the version as `placeholder` for that document. Privacy links to `https://onculture.io/privacy-policy`.

The tenant portal routes administrators with a selected plan but no subscription
to Billing. They can resume the selected plan with their declared employee count.
Free activation and verified first purchases route to the dashboard. Existing
tenants without a signup plan and non-admin employees retain normal routing.

Verification: production Vite build passed. TypeScript's unrelated existing
`src/pages/courses/[id].tsx:99` `videoUrl` error remains; no new signup errors were
reported. Live registration, provider webhook delivery, mobile layout and legal
document correctness still require end-to-end verification. Current registration
uses the existing email-link verification flow, not a new OTP flow.
