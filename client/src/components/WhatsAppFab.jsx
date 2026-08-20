import { trackEvent, EVENTS } from '../analytics';

export default function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab"
      href="https://wa.me/919158911851"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => trackEvent(EVENTS.WHATSAPP, { source: 'floating_button' })}
    >
      💬
    </a>
  );
}
