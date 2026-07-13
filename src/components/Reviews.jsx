import { HOSTEL, SAMPLE_REVIEWS } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./Reviews.css";

const PLATFORMS = ["Booking.com", "TripAdvisor", "Hostelworld"];

function ReviewCard({ review }) {
  const ref = useReveal();
  return (
    <figure className="reviews__card" ref={ref} data-reveal>
      <span className="reviews__card-badge">Sample</span>
      <div className="reviews__card-stars" aria-label={`${review.stars} out of 5 stars`}>
        {"★".repeat(review.stars)}
      </div>
      <blockquote className="reviews__card-text">{review.text}</blockquote>
      <figcaption className="reviews__card-author">
        <span className="reviews__card-avatar" aria-hidden="true">
          {review.name[0]}
        </span>
        <span>
          <strong>{review.name}</strong>
          <em>{review.origin}</em>
        </span>
      </figcaption>
    </figure>
  );
}

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
          Booking.com, TripAdvisor and Hostelworld. Real reviews would be
          pulled in from those platforms and shown here.
        </p>
      </div>

      <div className="reviews__cards">
        {SAMPLE_REVIEWS.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>

      <p className="reviews__sample-note">
        These three cards are illustrative samples for this preview, not real
        guest quotes. The live version would display genuine, dated reviews
        synced from the platforms below.
      </p>

      <div className="reviews__inner reviews__inner--bottom">
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
