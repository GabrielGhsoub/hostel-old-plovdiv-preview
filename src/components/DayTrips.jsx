import { HOSTEL, TRIPS } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./DayTrips.css";

export default function DayTrips() {
  const headerRef = useReveal();
  const chipsRef = useReveal();

  const mailtoHref = `mailto:${HOSTEL.email}?subject=${encodeURIComponent(
    "Rhodope day trip question"
  )}`;

  return (
    <section id="trips" className="trips">
      <div className="trips__inner">
        <div className="trips__header" ref={headerRef} data-reveal>
          <p className="trips__eyebrow">Beyond Plovdiv</p>
          <h2 className="trips__heading">
            8 Curated Day Trips into the Rhodope Mountains
          </h2>
          <p className="trips__lede">
            These are our own in-house itineraries, run direct with clear
            per-person pricing, not a resold tour from an outside agency.
          </p>
        </div>

        <ul className="trips__list" ref={chipsRef} data-reveal>
          {TRIPS.map((trip) => (
            <li className="trips__chip" key={trip}>
              {trip}
            </li>
          ))}
        </ul>

        <div className="trips__cta-wrap">
          <a className="trips__cta" href={mailtoHref}>
            Ask About a Trip
          </a>
        </div>
      </div>
    </section>
  );
}
