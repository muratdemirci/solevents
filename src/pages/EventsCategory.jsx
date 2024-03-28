import event from "../assets/event.jpeg";
import Navbar from "../components/Navbar";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { useState, useEffect } from "react";
import { slugToSentence } from "../utils/util";
import { Link, useParams } from "react-router-dom";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

const Event = ({ event }) => (
  <Link to={`/event/${event.slug}`} key={event.id} className="i_event">
    <img src={event.thumbnail} alt="Event" className="i_image" />
    <div className="i_content">
      <h2 style={{ marginBottom: "10px" }}>{event.title}</h2>
      <p style={{ marginBottom: "10px", opacity: 0.7 }}>
        Hosted by: {event.hostedBy}
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
        <p>Starting at {event.startTime}</p>
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

const EventsCategory = () => {
  const { category } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(
        collection(db, "events"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEvents(events);
    };

    fetchEvents();
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="home_events" style={{ paddingTop: "20px" }}>
        <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
          {slugToSentence(category)}
        </h1>
        <div className="body_events">
          {events.map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsCategory;
