import { HOSTEL } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./Location.css";

export default function Location() {
  const cardRef = useReveal();
  const mapRef = useReveal();

  return (
    <section id="location" className="location">
      <div className="location__inner">
        <div className="location__card" ref={cardRef} data-reveal>
          <p className="location__eyebrow">Find Us</p>
          <h2 className="location__heading">Getting Here</h2>

          <dl className="location__facts">
            <div className="location__fact">
              <dt>Address</dt>
              <dd>{HOSTEL.address}</dd>
            </div>
            <div className="location__fact">
              <dt>Phone</dt>
              <dd>
                <a href={HOSTEL.phoneHref}>{HOSTEL.phone}</a>
              </dd>
            </div>
            <div className="location__fact">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${HOSTEL.email}`}>{HOSTEL.email}</a>
              </dd>
            </div>
          </dl>

          <ul className="location__notes">
            <li>4 minutes on foot from the main pedestrian street</li>
            <li>Free on-site parking</li>
          </ul>

          <a
            className="location__directions"
            href={HOSTEL.osmDirections}
            target="_blank"
            rel="noreferrer"
          >
            Get Directions
          </a>
        </div>

        <div className="location__map-wrap" ref={mapRef} data-reveal>
          <iframe
            className="location__map"
            src={HOSTEL.osmEmbed}
            title="Map showing Hostel Old Plovdiv in Plovdiv Old Town"
            loading="lazy"
          />
          <p className="location__caption">
            Plovdiv Old Town, pedestrian core. Exact pin to be confirmed with
            the front desk on arrival.
          </p>
        </div>
      </div>
    </section>
  );
}
