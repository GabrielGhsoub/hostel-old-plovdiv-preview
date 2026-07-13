import { WHY } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./Why.css";

export default function Why() {
  const imgRef = useReveal();
  const copyRef = useReveal();

  return (
    <section id="why" className="why">
      <div className="why__inner">
        <div className="why__media" ref={imgRef} data-reveal>
          <div className="why__frame">
            <img
              className="why__img"
              src={WHY.img}
              alt="The garden at Hostel Old Plovdiv, with a century-old medlar tree and stone fountain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="why__copy" ref={copyRef} data-reveal>
          <p className="why__eyebrow">Why Stay Here</p>
          <h2 className="why__heading">
            A National Monument, Not a Chain Hotel
          </h2>
          <ul className="why__list">
            {WHY.points.map((point) => (
              <li className="why__item" key={point}>
                <span className="why__marker" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
