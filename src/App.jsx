import { useEffect, useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import TrustStrip from "./components/TrustStrip.jsx";
import Rooms from "./components/Rooms.jsx";
import Why from "./components/Why.jsx";
import Gallery from "./components/Gallery.jsx";
import DayTrips from "./components/DayTrips.jsx";
import Location from "./components/Location.jsx";
import Reviews from "./components/Reviews.jsx";
import BookingWidget from "./components/booking/BookingWidget.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // preselectedRoomId lets any "Book This Room" button deep-link into the embedded booking flow
  const [preselectedRoomId, setPreselectedRoomId] = useState(null);

  // Honor a #fragment arriving before React rendered (e.g. the /#book email link)
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, []);

  const openBooking = (roomId = null) => {
    setPreselectedRoomId(roomId);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <TrustStrip />
        <Rooms onBookRoom={openBooking} />
        <Why />
        <Gallery />
        <DayTrips />
        <BookingWidget preselectedRoomId={preselectedRoomId} />
        <Location />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
