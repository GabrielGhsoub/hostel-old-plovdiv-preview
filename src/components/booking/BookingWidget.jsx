import { useEffect, useMemo, useRef, useState } from "react";
import { ROOMS, BOOKING } from "../../data/content.js";
import useReveal from "../../hooks/useReveal.js";
import "./BookingWidget.css";

const STEP_LABELS = ["Dates & Guests", "Room", "Details", "Confirm"];
const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toInputDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const inDate = new Date(`${checkIn}T00:00:00`);
  const outDate = new Date(`${checkOut}T00:00:00`);
  const diff = Math.round((outDate - inDate) / 86400000);
  return Number.isFinite(diff) ? diff : 0;
}

function formatDisplayDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export default function BookingWidget({ preselectedRoomId }) {
  const revealRef = useReveal();
  const successRef = useRef(null);

  // Defaults computed once at runtime (never hardcoded dates).
  const todayIso = useMemo(() => toInputDate(new Date()), []);
  const defaultCheckIn = useMemo(() => toInputDate(addDays(new Date(), 1)), []);
  const defaultCheckOut = useMemo(() => toInputDate(addDays(new Date(), 3)), []);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(2);

  const [roomId, setRoomId] = useState(null);
  const [roomAttempted, setRoomAttempted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const nights = nightsBetween(checkIn, checkOut);
  const datesInvalid = !checkIn || !checkOut || nights <= 0;
  const showDateError = Boolean(checkIn) && Boolean(checkOut) && nights <= 0;

  const selectedRoom = ROOMS.find((r) => r.id === roomId) || null;
  const total = selectedRoom && nights > 0 ? selectedRoom.price * nights : 0;

  // Deep-link: when a "Book This Room" button elsewhere sets a new room id,
  // preselect it here and jump straight to the room step.
  useEffect(() => {
    if (preselectedRoomId) {
      setRoomId(preselectedRoomId);
      setRoomAttempted(false);
      setSubmitted(false);
      setStep(2);
    }
  }, [preselectedRoomId]);

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  function clearFieldError(key) {
    setFieldErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validateDetails() {
    const errs = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!email.trim()) errs.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim())) errs.email = "Please enter a valid email address.";
    if (!phone.trim()) errs.phone = "Please enter a phone number.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goNext() {
    if (step === 1) {
      if (!datesInvalid) setStep(2);
      return;
    }
    if (step === 2) {
      if (roomId) {
        setStep(3);
      } else {
        setRoomAttempted(true);
      }
      return;
    }
    if (step === 3 && validateDetails()) {
      setSubmitted(true);
      setStep(4);
    }
  }

  function goBack() {
    setSubmitted(false);
    setStep((s) => Math.max(1, s - 1));
  }

  function goToStep(target) {
    if (target >= step) return;
    setSubmitted(false);
    setStep(target);
  }

  function reset() {
    setStep(1);
    setSubmitted(false);
    setCheckIn(defaultCheckIn);
    setCheckOut(defaultCheckOut);
    setGuests(2);
    setRoomId(null);
    setRoomAttempted(false);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setFieldErrors({});
  }

  return (
    <section id="book" className="booking" aria-label="Book your stay">
      <div className="booking__inner" ref={revealRef} data-reveal>
        <header className="booking__header">
          <p className="booking__eyebrow">Book Direct</p>
          <h2 className="booking__heading">Book Your Stay</h2>
          <p className="booking__lede">
            A first-party booking flow, built and hosted by the hostel itself. No OTA in between,
            no commission on your room, straight to the front desk.
          </p>
        </header>

        <p className="booking__banner">{BOOKING.banner}</p>

        <div className="booking__card">
          <ol className="wizard__stepper">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const completed = n < step;
              const current = n === step;
              return (
                <li className="wizard__step-item" key={label}>
                  <button
                    type="button"
                    className={`wizard__step-btn${completed ? " is-completed" : ""}${current ? " is-current" : ""}`}
                    onClick={() => goToStep(n)}
                    disabled={!completed && !current}
                    aria-current={current ? "step" : undefined}
                  >
                    <span className="wizard__step-num">{completed ? "✓" : n}</span>
                    <span className="wizard__step-label">{label}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="wizard__panel" key={step}>
            {step === 1 && (
              <div className="wizard__step-content">
                <h3 className="wizard__step-title">When are you staying?</h3>
                <div className="wizard__field-row">
                  <div className="wizard__field">
                    <label htmlFor="bw-checkin">Check in</label>
                    <input
                      id="bw-checkin"
                      type="date"
                      value={checkIn}
                      min={todayIso}
                      onChange={(e) => setCheckIn(e.target.value)}
                      aria-invalid={showDateError}
                    />
                  </div>
                  <div className="wizard__field">
                    <label htmlFor="bw-checkout">Check out</label>
                    <input
                      id="bw-checkout"
                      type="date"
                      value={checkOut}
                      min={checkIn || todayIso}
                      onChange={(e) => setCheckOut(e.target.value)}
                      aria-invalid={showDateError}
                    />
                  </div>
                  <div className="wizard__field">
                    <label htmlFor="bw-guests">Guests</label>
                    <select id="bw-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                      {GUEST_OPTIONS.map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {showDateError ? (
                  <p className="wizard__error" role="alert">
                    Check out must be after check in.
                  </p>
                ) : (
                  nights > 0 && (
                    <p className="wizard__hint">
                      {nights} {nights === 1 ? "night" : "nights"}
                    </p>
                  )
                )}
              </div>
            )}

            {step === 2 && (
              <div className="wizard__step-content">
                <h3 className="wizard__step-title">Choose your room</h3>
                <div className="wizard__rooms" role="radiogroup" aria-label="Room type">
                  {ROOMS.map((room) => (
                    <label
                      key={room.id}
                      className={`wizard__room-card${roomId === room.id ? " is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="bw-room"
                        value={room.id}
                        checked={roomId === room.id}
                        onChange={() => {
                          setRoomId(room.id);
                          setRoomAttempted(false);
                        }}
                      />
                      <span className="wizard__room-img">
                        <img src={room.img} alt={room.name} loading="lazy" />
                      </span>
                      <span className="wizard__room-body">
                        <span className="wizard__room-name">{room.name}</span>
                        <span className="wizard__room-desc">{room.desc}</span>
                        <span className="wizard__room-price">
                          EUR {room.price} <small>{room.per}</small>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                {roomAttempted && !roomId && (
                  <p className="wizard__error" role="alert">
                    Please select a room to continue.
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="wizard__step-content">
                <h3 className="wizard__step-title">Your details</h3>
                <p className="wizard__demo-note">{BOOKING.demoNote}</p>
                <div className="wizard__form-grid">
                  <div className="wizard__field">
                    <label htmlFor="bw-name">Full name</label>
                    <input
                      id="bw-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearFieldError("name");
                      }}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "bw-name-err" : undefined}
                    />
                    {fieldErrors.name && (
                      <span id="bw-name-err" className="wizard__error" role="alert">
                        {fieldErrors.name}
                      </span>
                    )}
                  </div>
                  <div className="wizard__field">
                    <label htmlFor="bw-email">Email</label>
                    <input
                      id="bw-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError("email");
                      }}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "bw-email-err" : undefined}
                    />
                    {fieldErrors.email && (
                      <span id="bw-email-err" className="wizard__error" role="alert">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>
                  <div className="wizard__field">
                    <label htmlFor="bw-phone">Phone</label>
                    <input
                      id="bw-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        clearFieldError("phone");
                      }}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? "bw-phone-err" : undefined}
                    />
                    {fieldErrors.phone && (
                      <span id="bw-phone-err" className="wizard__error" role="alert">
                        {fieldErrors.phone}
                      </span>
                    )}
                  </div>
                  <div className="wizard__field wizard__field--full">
                    <label htmlFor="bw-notes">Notes (optional)</label>
                    <textarea
                      id="bw-notes"
                      rows="3"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && submitted && (
              <div className="wizard__success" ref={successRef} tabIndex={-1}>
                <span className="wizard__success-icon" aria-hidden="true">
                  &#10003;
                </span>
                <h3 className="wizard__step-title">Request received</h3>
                <p className="wizard__success-note">{BOOKING.confirmNote}</p>
                <table className="wizard__summary-table">
                  <tbody>
                    <tr>
                      <th scope="row">Guest</th>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Phone</th>
                      <td>{phone}</td>
                    </tr>
                    <tr>
                      <th scope="row">Check in</th>
                      <td>{formatDisplayDate(checkIn)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Check out</th>
                      <td>{formatDisplayDate(checkOut)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Nights</th>
                      <td>{nights}</td>
                    </tr>
                    <tr>
                      <th scope="row">Guests</th>
                      <td>{guests}</td>
                    </tr>
                    <tr>
                      <th scope="row">Room</th>
                      <td>{selectedRoom ? selectedRoom.name : ""}</td>
                    </tr>
                    <tr className="wizard__summary-total">
                      <th scope="row">Estimated total</th>
                      <td>EUR {total}</td>
                    </tr>
                  </tbody>
                </table>
                <button type="button" className="wizard__btn wizard__btn--ghost" onClick={reset}>
                  Start over
                </button>
              </div>
            )}
          </div>

          {step < 4 && (
            <div className="wizard__actions">
              {step > 1 && (
                <button type="button" className="wizard__btn wizard__btn--ghost" onClick={goBack}>
                  Back
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  className="wizard__btn wizard__btn--primary"
                  onClick={goNext}
                  disabled={step === 1 && datesInvalid}
                >
                  Continue
                </button>
              )}
              {step === 3 && (
                <button type="button" className="wizard__btn wizard__btn--primary" onClick={goNext}>
                  Request booking
                </button>
              )}
            </div>
          )}

          {selectedRoom && (step === 2 || step === 3) && (
            <div className="wizard__summary-bar">
              <span className="wizard__summary-room">{selectedRoom.name}</span>
              <span className="wizard__summary-calc">
                EUR {selectedRoom.price} &times; {nights} {nights === 1 ? "night" : "nights"} ={" "}
                <strong>EUR {total}</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
