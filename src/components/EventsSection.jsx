import { Link } from "react-router-dom";
import event from "../assets/event.jpeg";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const EventItem = ({ event }) => (
  <Link to={`/event/${event.slug}`} key={event.id} className="i_event">
    <img src={event.thumbnail} alt="Event" className="i_image" />
    <div className="i_content">
      <h2 style={{ marginBottom: "10px" }}>{event.title}</h2>
      <p style={{ marginBottom: "10px", opacity: 0.7 }}>
        Hosted by: {event.host}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          opacity: 0.7,
          marginBottom: "10px",
        }}
      >
        <AiOutlineCalendar style={{ marginRight: "5px" }} />
        <p>Starting at {event.start_time}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          opacity: 0.7,
          marginBottom: "10px",
        }}
      >
        <ImLocation2 style={{ marginRight: "5px", color: "red" }} />
        <p>{event.location}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          opacity: 0.7,
          marginBottom: "10px",
        }}
      >
        <BsCheckCircle style={{ marginRight: "5px", color: "green" }} />
        <p>{event && event.attendees ? event.attendees.length : 0} going</p>
      </div>
    </div>
  </Link>
);

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async (setEvents) => {
    const eventsCollection = collection(db, "events"); // replace 'events' with your collection name
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventsList = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(eventsList);
  };

  useEffect(() => {
    fetchEvents(setEvents);
  }, []);

  return (
    <div className="home_events">
      <section className="header_events">
        <h1 style={{ fontSize: "30px" }}>Upcoming events</h1>
        <Link to="/events/all" className="link">
          See all events
        </Link>
      </section>

      <div className="body_events">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
