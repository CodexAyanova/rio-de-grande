import { useReveal } from '../hooks/useReveal';

const menu = [
  {
    name: 'Indian Breakfast',
    choices: ['Chole bature with onions', 'Puri bhaji', 'Paratha (aloo & mix) with yogurt or achar'],
    includes: ['Avocado juice, watermelon, banana or orange juice', 'Tea or coffee'],
  },
  {
    name: 'Continental Breakfast',
    choices: ['Masala omelette with toast', 'Corn flakes'],
    includes: ['Avocado juice, watermelon, banana or orange juice', 'Fruit salad', 'Tea or coffee'],
  },
  {
    name: 'Set Breakfast',
    choices: ['Hash brown potato', 'Eggs', 'Toast', 'Salad'],
    includes: ['Avocado juice, watermelon, banana or orange juice', 'Tea or coffee'],
  },
];

function MenuCard({ item }) {
  const ref = useReveal();
  return (
    <div className="menu-card" ref={ref} data-reveal>
      <h3>{item.name}</h3>
      <p className="menu-label">Choose one</p>
      <ul className="menu-choices">
        {item.choices.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="menu-label">Includes</p>
      <ul className="menu-includes">
        {item.includes.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Breakfast() {
  const headRef = useReveal();

  return (
    <section className="breakfast" id="breakfast">
      <div className="section-head" ref={headRef} data-reveal>
        <p className="eyebrow">On The House</p>
        <h2>Complimentary Breakfast</h2>
        <p className="section-sub">Included with every stay — pick your style each morning.</p>
      </div>
      <div className="menu-grid">
        {menu.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
