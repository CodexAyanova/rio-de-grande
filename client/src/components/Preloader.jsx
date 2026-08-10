import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`preloader${hidden ? ' hidden' : ''}`}>
      <div className="preloader-logo">Rio de Grande</div>
    </div>
  );
}
