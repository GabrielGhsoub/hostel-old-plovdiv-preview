import { useEffect, useState } from "react";
import { HOSTEL } from "../data/content.js";
import "./Nav.css";

const LINKS = [
  { href: "#rooms", label: "Rooms" },
  { href: "#why", label: "Why Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#trips", label: "Day Trips" },
  { href: "#location", label: "Location" },
  { href: "#reviews", label: "Reviews" },
];

export default function Nav({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" onClick={closeMenu}>
          <img className="nav__logo" src={HOSTEL.logo} alt={`${HOSTEL.name} logo`} loading="lazy" />
          <span className="nav__wordmark">{HOSTEL.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button type="button" className="nav__book" onClick={onBook}>
            Book Direct
          </button>
          <button
            type="button"
            className="nav__hamburger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="nav-mobile-menu"
        className={`nav__overlay${menuOpen ? " nav__overlay--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="nav__close"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <span />
          <span />
        </button>

        <nav className="nav__overlay-links" aria-label="Mobile">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav__overlay-link" onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="nav__overlay-book"
          onClick={() => {
            closeMenu();
            onBook();
          }}
        >
          Book Direct
        </button>
      </div>
    </header>
  );
}
