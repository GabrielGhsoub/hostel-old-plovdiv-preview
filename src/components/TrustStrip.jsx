import { TRUST } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./TrustStrip.css";

export default function TrustStrip() {
  const ref = useReveal();

  return (
    <section className="trust" aria-label="Why guests trust us">
      <div className="trust__inner" ref={ref} data-reveal>
        <ul className="trust__grid">
          {TRUST.map((item) => (
            <li className="trust__item" key={item.stat}>
              <span className="trust__stat">{item.stat}</span>
              <span className="trust__text">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
