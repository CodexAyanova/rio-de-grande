import { useEffect, useState } from 'react';
import { BOOKING_URL } from '../constants';

const links = [
  { href: '#about', label: 'About' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#cafe', label: 'Café' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="#home" className="logo">
          <img src="/images/logo.png" alt="Rio de Grande logo" />
          <span>RIO DE GRANDE</span>
        </a>
        <button className="nav-toggle" aria-label="Open menu" onClick={() => setOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
        <ul id="navMenu" className={open ? 'open' : ''}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
              onClick={() => setOpen(false)}
            >
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
