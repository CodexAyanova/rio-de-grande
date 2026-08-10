# Rio de Grande — Website

A luxury beachside resort & café website for Rio de Grande (Agonda, Goa). Fully static
React (Vite) site — no backend, no database. Guests get in touch via WhatsApp, phone, or email.

There's also an AI WhatsApp concierge bot (Claude-powered) that answers guest FAQs — see
[WHATSAPP_BOT_SETUP.md](WHATSAPP_BOT_SETUP.md) for setup.

## Stack

- **React** (Vite) — in `client/`
- Static content only — rooms, gallery and café photos are hardcoded in the components
  that display them (`client/src/components/Rooms.jsx`, `Gallery.jsx`, `Cafe.jsx`)
- **`client/api/whatsapp.js`** — a Vercel serverless function powering the WhatsApp bot
  (Meta Cloud API + Claude API). Deploys alongside the site automatically.

## Project layout

```
client/
  api/
    whatsapp.js  WhatsApp webhook handler (verification + AI replies)
  public/images/ Room, café and gallery photos
  src/
    components/  Navbar, Hero, Rooms, Cafe, Gallery, Contact, Footer, etc.
    hooks/        scroll-reveal animation hook
    constants.js  the MakeMyTrip booking link
```

## Setup

```bash
cd client
npm install
```

## Running locally

```bash
cd client
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173`).

## Building for deployment

```bash
cd client
npm run build
```

Outputs a static `client/dist` folder — that's the entire deployable site (HTML, CSS, JS,
images). Any static host works: GitHub Pages, Vercel, Netlify, Render's static site option, etc.

## Key links

- **Book Now** buttons → MakeMyTrip listing for Rio de Grande, Agonda (set in `client/src/constants.js`)
- **Reserve a Table** (Sora Café) → `sorabeachpub.com`
- **Chat on WhatsApp** / floating WhatsApp button → `wa.me/919158911851`
- Phone and email in the Contact section are `tel:` / `mailto:` links

## Notes

- Room and gallery images live in `client/public/images` — swap in new photos any time,
  filenames must match what's referenced in `Rooms.jsx` / `Gallery.jsx` / `Cafe.jsx` / `About.jsx`.
- There is no contact form and no database — all enquiries go through WhatsApp/phone/email directly.
