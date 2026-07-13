import { useEffect, useRef, useState } from "react";
import { ROOMS, ROOM_FACTS, INCLUDED_WITH_EVERY_ROOM } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";
import "./Rooms.css";

function RoomModal({ room, onClose, onBookRoom }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!room) return null;

  return (
    <div className="room-modal__overlay" onClick={onClose} role="presentation">
      <div
        className="room-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="room-modal__close"
          aria-label="Close room details"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="room-modal__img-wrap">
          <img className="room-modal__img" src={room.img} alt={room.name} />
        </div>
        <div className="room-modal__body">
          <h3 id="room-modal-title" className="room-modal__name">{room.name}</h3>
          <p className="room-modal__price">
            <span className="room-modal__price-amount">EUR {room.price}</span>
            <span className="room-modal__price-per">{room.per}, per night</span>
          </p>
          <p className="room-modal__desc">{room.desc}</p>
          <div className="room-modal__facts">
            <h4 className="room-modal__facts-title">The room</h4>
            <ul>
              {(ROOM_FACTS[room.id] || []).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="room-modal__facts">
            <h4 className="room-modal__facts-title">Included with every room</h4>
            <ul>
              {INCLUDED_WITH_EVERY_ROOM.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="room-modal__cta"
            onClick={() => {
              onClose();
              onBookRoom(room.id);
            }}
          >
            Book This Room
          </button>
        </div>
      </div>
    </div>
  );
}

function RoomCard({ room, onBookRoom, onOpenDetails }) {
  const ref = useReveal();

  return (
    <article className="room-card" ref={ref} data-reveal>
      <button
        type="button"
        className="room-card__details-hit"
        onClick={() => onOpenDetails(room)}
        aria-label={`View details for ${room.name}`}
      >
        <span className="room-card__img-wrap">
          <img
            className="room-card__img"
            src={room.img}
            alt={room.name}
            loading="lazy"
          />
          <span className="room-card__view" aria-hidden="true">View details</span>
        </span>
        <span className="room-card__name">{room.name}</span>
        <span className="room-card__desc">{room.desc}</span>
      </button>
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
    </article>
  );
}

export default function Rooms({ onBookRoom }) {
  const headerRef = useReveal();
  const [openRoom, setOpenRoom] = useState(null);

  return (
    <section id="rooms" className="rooms">
      <div className="rooms__inner">
        <div className="rooms__header" ref={headerRef} data-reveal>
          <p className="rooms__eyebrow">Rooms &amp; Rates</p>
          <h2 className="rooms__heading">Only 3 to 4 Beds Per Room</h2>
          <p className="rooms__lede">
            Five room types in the restored 1868 house, from single dorm beds to
            private quads, each with antique furniture and a rate that includes
            breakfast, wifi and parking. Tap a room for details.
          </p>
        </div>

        <div className="rooms__grid">
          {ROOMS.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onBookRoom={onBookRoom}
              onOpenDetails={setOpenRoom}
            />
          ))}
        </div>
      </div>

      {openRoom && (
        <RoomModal
          room={openRoom}
          onClose={() => setOpenRoom(null)}
          onBookRoom={onBookRoom}
        />
      )}
    </section>
  );
}
