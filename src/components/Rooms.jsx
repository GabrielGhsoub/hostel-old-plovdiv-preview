import { ROOMS } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./Rooms.css";

function RoomCard({ room, onBookRoom }) {
  const ref = useReveal();

  return (
    <article className="room-card" ref={ref} data-reveal>
      <div className="room-card__img-wrap">
        <img
          className="room-card__img"
          src={room.img}
          alt={room.name}
          loading="lazy"
        />
      </div>
      <div className="room-card__body">
        <h3 className="room-card__name">{room.name}</h3>
        <p className="room-card__desc">{room.desc}</p>
        <div className="room-card__footer">
          <p className="room-card__price">
            <span className="room-card__price-amount">EUR {room.price}</span>
            <span className="room-card__price-per">{room.per}</span>
          </p>
          <button
            type="button"
            className="room-card__cta"
            onClick={() => onBookRoom(room.id)}
          >
            Book This Room
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Rooms({ onBookRoom }) {
  const headerRef = useReveal();

  return (
    <section id="rooms" className="rooms">
      <div className="rooms__inner">
        <div className="rooms__header" ref={headerRef} data-reveal>
          <p className="rooms__eyebrow">Rooms &amp; Rates</p>
          <h2 className="rooms__heading">Only 3 to 4 Beds Per Room</h2>
          <p className="rooms__lede">
            Five room types in the restored 1868 house, from single dorm beds to
            private quads, each with antique furniture and a rate that includes
            breakfast, wifi and parking.
          </p>
        </div>

        <div className="rooms__grid">
          {ROOMS.map((room) => (
            <RoomCard key={room.id} room={room} onBookRoom={onBookRoom} />
          ))}
        </div>
      </div>
    </section>
  );
}
