import Navbar from "../components/Navbar";
import { Link as RouteLink } from "react-router-dom";
import { VscLinkExternal } from "react-icons/vsc";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const Event = ({ event }) => (
  <div className="dashboard_event" key={event.id}>
    <h2>{event.title}</h2>
    <RouteLink to={`/event/${event.slug}`}>
      <VscLinkExternal size={20} />
    </RouteLink>
  </div>
);

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = collection(db, "events");
      const eventSnapshot = await getDocs(eventCollection);
      const eventList = eventSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(eventList);
    };

    fetchEvents();
  }, []);

  return (
    <div className="dashboard_container">
      <Navbar />
      <div className="dashboard_main">
        <section className="header_events">
          <h1 style={{ fontSize: "30px" }}>Your Events</h1>
          <RouteLink to="/create/event" className="link">
            Create new event
          </RouteLink>
        </section>
        <div className="dashboard_events">
          {events
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .map((event) => (
              <Event key={event.id} event={event} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
