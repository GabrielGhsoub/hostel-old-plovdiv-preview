import { HOSTEL } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./Footer.css";

const EXPLORE_LINKS = [
  { href: "#rooms", label: "Rooms" },
  { href: "#why", label: "Why Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#trips", label: "Day Trips" },
  { href: "#location", label: "Location" },
  { href: "#reviews", label: "Reviews" },
];

export default function Footer() {
  const revealRef = useReveal();

  return (
    <footer className="footer" ref={revealRef} data-reveal>
      <div className="footer__inner">
        <div className="footer__col footer__brand">
          <p className="footer__name">{HOSTEL.name}</p>
          <p className="footer__sub">{HOSTEL.sub}</p>
          <p className="footer__line">{HOSTEL.address}</p>
          <p className="footer__line">
            <a className="footer__link" href={HOSTEL.phoneHref}>
              {HOSTEL.phone}
            </a>
          </p>
          <p className="footer__line">
            <a className="footer__link" href={`mailto:${HOSTEL.email}`}>
              {HOSTEL.email}
            </a>
          </p>
        </div>

        <div className="footer__col">
          <p className="footer__heading">Explore</p>
          <ul className="footer__list">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <a className="footer__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <p className="footer__heading">Book</p>
          <ul className="footer__list">
            <li>
              <a className="footer__link" href="#book">
                Book Direct
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">
          Copyright 2026 {HOSTEL.name}. All rights reserved.
        </p>
        <p className="footer__credit">
          Free concept by{" "}
          <a className="footer__link footer__link--gold" href="https://likwiid.com" target="_blank" rel="noreferrer">
            Likwiid
          </a>{" "}
          &middot; likwiid.com
        </p>
      </div>
    </footer>
  );
}
