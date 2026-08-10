import { useReveal } from '../hooks/useReveal';

const stats = [
  { value: '3', label: 'Room Categories' },
  { value: '50m', label: 'To the Beach' },
  { value: '24/7', label: 'Café & Service' },
  { value: '5★', label: 'Guest Experience' },
];

export default function StatsStrip() {
  const ref = useReveal();
  return (
    <section className="stats-strip" ref={ref} data-reveal>
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </section>
  );
}
