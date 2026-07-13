import { GALLERY } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./Gallery.css";

function GalleryTile({ src, index }) {
  const ref = useReveal();
  return (
    <div
      className={`gallery__tile gallery__tile--${index % 6}`}
      ref={ref}
      data-reveal
    >
      <img
        className="gallery__img"
        src={src}
        alt={`Hostel Old Plovdiv, view ${index + 1}`}
        loading="lazy"
      />
    </div>
  );
}

export default function Gallery() {
  const headerRef = useReveal();

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__inner">
        <div className="gallery__header" ref={headerRef} data-reveal>
          <p className="gallery__eyebrow">Gallery</p>
          <h2 className="gallery__heading">Inside the 1868 House</h2>
        </div>

        <div className="gallery__grid">
          {GALLERY.map((src, index) => (
            <GalleryTile src={src} index={index} key={src} />
          ))}
        </div>
      </div>
    </section>
  );
}
