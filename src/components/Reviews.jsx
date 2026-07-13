import { HOSTEL } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./Reviews.css";

const PLATFORMS = ["Booking.com", "TripAdvisor", "Hostelworld"];

export default function Reviews() {
  const ref = useReveal();

  return (
    <section id="reviews" className="reviews">
      <div className="reviews__inner" ref={ref} data-reveal>
        <div className="reviews__stars" aria-hidden="true">
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </div>
        <p className="reviews__eyebrow">Guest Reviews</p>
        <h2 className="reviews__heading">Top Rated Hostel in Plovdiv</h2>
        <p className="reviews__copy">
          Guests consistently rate us among the best hostels in Plovdiv on
          Booking.com, TripAdvisor and Hostelworld. Rather than quote
          ourselves, we link straight to the platforms so you can read real,
          dated reviews yourself. No quotes are invented on this page.
        </p>

        <ul className="reviews__platforms">
          {PLATFORMS.map((platform) => (
            <li className="reviews__platform" key={platform}>
              {platform}
            </li>
          ))}
        </ul>

        <a
          className="reviews__cta"
          href={HOSTEL.bookingComUrl}
          target="_blank"
          rel="noreferrer"
        >
          See us on Booking.com
        </a>
      </div>
    </section>
  );
}
