import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { BOOKING_URL } from '../constants';
import { trackEvent, EVENTS } from '../analytics';

const slides = ['/images/poolnight.jpg', '/images/cafeexterior.jpg', '/images/gallery33.jpg'];

export default function Hero() {
  const [active, setActive] = useState(0);
  const contentRef = useReveal();

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="hero" id="home">
      <div className="hero-slides">
        {slides.map((src, i) => (
          <div
            key={src}
            className={`hero-slide${i === active ? ' active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-content" ref={contentRef} data-reveal>
        <p className="eyebrow">Agonda &middot; Goa</p>
        <h1>Escape to <span>Rio de Grande</span></h1>
        <p className="hero-sub">
          A luxury beachside resort with elegant rooms and a cozy café, where the tide sets
          the pace and every sunset feels like the first.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#rooms">Explore Rooms</a>
          <a
            className="btn btn-ghost"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(EVENTS.BOOKING, { source: 'hero' })}
          >
            Book Now
          </a>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll down"><span></span></a>
    </header>
  );
}
