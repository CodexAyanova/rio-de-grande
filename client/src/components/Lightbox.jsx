import { useEffect } from 'react';

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={`lightbox${image ? ' open' : ''}`} onClick={onClose}>
      <button className="lightbox-close" aria-label="Close" onClick={onClose}>&times;</button>
      {image && <img src={image.src} alt={image.alt || ''} onClick={(e) => e.stopPropagation()} />}
    </div>
  );
}
