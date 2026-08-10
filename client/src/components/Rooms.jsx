import { useReveal } from '../hooks/useReveal';

const rooms = [
  {
    name: 'Deluxe Rooms',
    description: 'Bright, breezy and effortlessly comfortable — perfect for couples and solo travellers.',
    images: ['/images/deluxeroom2.jpg', '/images/deluxeroom4.jpg', '/images/deluxeroom3.jpg', '/images/deluxeroom.jpg'],
  },
  {
    name: 'Luxury Rooms',
    description: 'Extra space, premium finishes and thoughtful touches for a truly indulgent stay.',
    images: ['/images/lux1.jpeg', '/images/lux2.jpeg', '/images/lux3.jpeg', '/images/lux4.jpeg'],
  },
  {
    name: 'Family Rooms',
    description: 'Spacious layouts built for togetherness, with room for everyone to relax.',
    images: ['/images/fam1.jpeg', '/images/fam2.jpeg', '/images/fam3.jpeg', '/images/fam4.jpeg'],
  },
];

function RoomBlock({ room, onImageClick }) {
  const ref = useReveal();
  return (
    <div className="room-block" ref={ref} data-reveal>
      <div className="room-block-head">
        <h3>{room.name}</h3>
        <p>{room.description}</p>
      </div>
      <div className="room-gallery">
        {room.images.map((src) => (
          <img
            key={src}
            src={src}
            alt={`${room.name} at Rio de Grande`}
            onClick={() => onImageClick(src, room.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Rooms({ onImageClick }) {
  const headRef = useReveal();

  return (
    <section className="rooms" id="rooms">
      <div className="section-head" ref={headRef} data-reveal>
        <p className="eyebrow">Stay With Us</p>
        <h2>Rooms &amp; Suites</h2>
        <p className="section-sub">Three ways to make yourself at home, each with its own character.</p>
      </div>

      {rooms.map((room) => (
        <RoomBlock key={room.name} room={room} onImageClick={onImageClick} />
      ))}
    </section>
  );
}
