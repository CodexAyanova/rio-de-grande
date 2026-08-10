import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const ref = useReveal();

  return (
    <section id="contact" className="contact">
      <div className="contact-copy contact-copy-centered" ref={ref} data-reveal>
        <p className="eyebrow">Get In Touch</p>
        <h2>Plan your stay at Rio de Grande</h2>
        <p>Have a question or ready to book? Message us on WhatsApp — we usually reply within the hour.</p>
        <ul className="contact-list">
          <li><a href="tel:+919158911851">📞 +91 91589 11851</a></li>
          <li><a href="mailto:riodegrandeagonda@gmail.com">✉️ riodegrandeagonda@gmail.com</a></li>
          <li>📍 Agonda, Goa, India</li>
        </ul>
        <a className="btn btn-primary" href="https://wa.me/919158911851" target="_blank" rel="noopener noreferrer">
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
