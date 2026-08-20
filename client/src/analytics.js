// Google Analytics 4 + Google Ads tracking.
//
// Both IDs come from environment variables so they can be set in Vercel
// without touching code. Until at least one is set, everything here is a
// no-op — no scripts load, no cookies, no network calls.
//
//   VITE_GA_MEASUREMENT_ID   e.g. G-XXXXXXXXXX   (Google Analytics 4)
//   VITE_GOOGLE_ADS_ID       e.g. AW-123456789   (Google Ads)

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || '';

let initialised = false;

export function initAnalytics() {
  if (initialised) return;

  const ids = [GA_MEASUREMENT_ID, GOOGLE_ADS_ID].filter(Boolean);
  if (ids.length === 0) return; // nothing configured yet

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ids[0]}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  ids.forEach((id) => gtag('config', id));

  initialised = true;
}

/**
 * Record a guest action. Safe to call whether or not analytics is configured.
 * In Google Ads, import these GA4 events as conversions rather than creating
 * separate Ads conversion tags.
 */
export function trackEvent(name, params = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

// The actions worth paying for. `whatsapp_click` and `phone_click` are the
// real money events — those are direct enquiries with no OTA commission.
export const EVENTS = {
  WHATSAPP: 'whatsapp_click',
  PHONE: 'phone_click',
  EMAIL: 'email_click',
  BOOKING: 'booking_click', // outbound to MakeMyTrip
  CAFE: 'cafe_reservation_click',
};
