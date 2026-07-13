import { HOSTEL, HERO_IMAGES } from "../data/content.js";
import "./Hero.css";

export default function Hero({ onBook }) {
  return (
    <section id="top" className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${HERO_IMAGES[0]})` }} role="img" aria-label="Facade of Hostel Old Plovdiv, a restored 1868 Renaissance house" />
      <div className="hero__scrim" />

      <div className="hero__content">
        <p className="hero__eyebrow">Plovdiv Old Town, Bulgaria</p>
        <h1 className="hero__headline">{HOSTEL.tagline}</h1>
        <p className="hero__intro">{HOSTEL.intro}</p>

        <div className="hero__ctas">
          <button type="button" className="hero__cta hero__cta--primary" onClick={onBook}>
            Book Direct, No Commission
          </button>
          <a className="hero__cta hero__cta--ghost" href="#rooms">
            See Rooms &amp; Rates
          </a>
        </div>
      </div>

      <a className="hero__scroll" href="#rooms" aria-label="Scroll to rooms">
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}
