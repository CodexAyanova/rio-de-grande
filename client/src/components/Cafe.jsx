import { useReveal } from '../hooks/useReveal';
import { trackEvent, EVENTS } from '../analytics';

const images = [
  '/images/cafe1.jpeg',
  '/images/cafe2.jpeg',
  '/images/cafe3.jpeg',
  '/images/cafe4.jpeg',
  '/images/cafe5.jpeg',
  '/images/cafe6.jpeg',
];

export default function Cafe({ onImageClick }) {
  const copyRef = useReveal();
  const galleryRef = useReveal();

  return (
    <section id="cafe" className="cafe">
      <div className="cafe-inner">
        <div className="cafe-copy" ref={copyRef} data-reveal>
          <p className="eyebrow">Sora Café</p>
          <h2>Fresh coffee, breakfast &amp; tropical flavours</h2>
          <p>
            Start your morning with slow coffee and end your day with a sunset snack. Sora Café
            serves honest, flavourful food made for guests who love the beach as much as they
            love a good meal.
          </p>
          <a
            className="btn btn-outline"
            href="https://sorabeachpub.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(EVENTS.CAFE)}
          >
            Reserve a Table
          </a>
        </div>
        <div className="cafe-gallery" ref={galleryRef} data-reveal>
          {images.map((src) => (
            <img key={src} src={src} alt="Sora Café" onClick={() => onImageClick(src, 'Sora Café')} />
          ))}
        </div>
      </div>
    </section>
  );
}
