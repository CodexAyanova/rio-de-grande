import { useReveal } from '../hooks/useReveal';

const features = [
  { icon: '🌊', label: 'Steps from the beach' },
  { icon: '🍳', label: 'Complimentary breakfast' },
  { icon: '☕', label: 'All-day café' },
  { icon: '🛏️', label: 'Elegant, airy rooms' },
  { icon: '🌴', label: 'Lush tropical garden' },
];

export default function About() {
  const mediaRef = useReveal();
  const copyRef = useReveal();

  return (
    <section id="about" className="about">
      <div className="about-grid">
        <div className="about-media" ref={mediaRef} data-reveal>
          <img src="/images/gallery22.jpg" alt="Rio de Grande resort view" />
          <img className="about-media-small" src="/images/cafe1.jpeg" alt="Sora Café" />
        </div>
        <div className="about-copy" ref={copyRef} data-reveal>
          <p className="eyebrow">About Us</p>
          <h2>A peaceful coastal retreat where comfort meets nature</h2>
          <p>
            Tucked along the quiet sands of Agonda Beach, Rio de Grande blends barefoot-luxury
            comfort with warm, personal hospitality. Wake up to the sound of waves, spend your
            day by the shore, and unwind each evening with tropical flavours at Sora Café.
          </p>
          <p>
            Every room is designed for rest — clean lines, natural textures, and a view that
            never gets old. Whether you're here for a quiet weekend or a longer stay, we take
            care of the details so you don't have to.
          </p>
          <div className="about-features">
            {features.map((f) => (
              <div key={f.label}><span>{f.icon}</span>{f.label}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
