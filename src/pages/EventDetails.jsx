import Navbar from "../components/Navbar";
import event from "../assets/event.jpeg";
import { useState, useEffect } from "react";
import { postNewComment, postRegisterForEvent } from "../utils/util";
import { useNavigate, useParams } from "react-router-dom";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

const Comment = ({ comment }) => (
  <div
    style={{
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "3px",
      marginBottom: "10px",
    }}
    key={comment.id}
  >
    <p style={{ color: "#1d5d9b", marginBottom: "3px" }}>@{comment.user}</p>
    <p style={{ opacity: 0.5 }}>{comment.comment}</p>
  </div>
);

const EventDetails = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    const fetchEventBySlug = async (slug) => {
      const q = query(collection(db, "events"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const eventDetail = { id: doc.id, ...doc.data() };
        setEventDetails(eventDetail);
      } else {
        console.log("No event with this slug found");
      }
    };
    fetchEventBySlug(slug);
    setLoading(false);
  }, [slug]);

  const addComment = (e) => {
    e.preventDefault();
    postNewComment(comment, localStorage.getItem("user_id"), slug);
  };

  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return (
    <div>
      <Navbar />
      <header className="details_header">
        <h2 style={{ marginBottom: "15px" }}>{eventDetails.title}</h2>
        <p style={{ opacity: 0.6 }}>
          Hosted by:{" "}
          <span style={{ fontWeight: "bold" }}>{eventDetails.hostedBy}</span>
        </p>
      </header>
      <main className="details_main">
        <div className="details_content">
          <img
            src={eventDetails.thumbnail}
            alt="Event"
            className="details_image"
          />
          <div style={{ marginBottom: "30px" }}>{eventDetails.description}</div>
          <div style={{ padding: "30px 0" }}>
            <h2 style={{ color: "#1d5d9b", marginBottom: "15px" }}>
              Attendees
            </h2>
            <p style={{ opacity: 0.6 }}>
              {eventDetails?.attendees?.map((attendee) => (
                <span key={attendee}>{attendee}, </span>
              ))}
            </p>
          </div>

          <div className="comments">
            <h2 style={{ color: "#1d5d9b" }}>Comments</h2>
            <form className="comment_form" onSubmit={addComment}>
              <textarea
                rows={4}
                className="commentInput"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button className="buttons commentBtn">Comment</button>
            </form>

            <div className="comment_section">
              {eventDetails?.comments?.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
        <div className="details_cta">
          <p style={{ marginBottom: "10px", opacity: "0.6" }}>
            Click here to register
          </p>
          <button
            className="buttons registerBtn"
            onClick={() =>
              postRegisterForEvent(
                localStorage.getItem("user_id"),
                eventDetails.id,
                navigate("/register")
              )
            }
          >
            Register
          </button>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
