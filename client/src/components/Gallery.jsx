import { useReveal } from '../hooks/useReveal';

const images = [
  '/images/gallery11.jpg',
  '/images/gallery22.jpg',
  '/images/gallery33.jpg',
  '/images/gallery44.jpg',
  '/images/gallery55.jpg',
  '/images/gallery66.jpg',
];

export default function Gallery({ onImageClick }) {
  const headRef = useReveal();
  const gridRef = useReveal();

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-head" ref={headRef} data-reveal>
        <p className="eyebrow">Take a Look</p>
        <h2>Gallery</h2>
      </div>
      <div className="gallery-grid" ref={gridRef} data-reveal>
        {images.map((src) => (
          <img
            key={src}
            src={src}
            alt="Rio de Grande gallery"
            onClick={() => onImageClick(src, 'Rio de Grande gallery')}
          />
        ))}
      </div>
    </section>
  );
}
