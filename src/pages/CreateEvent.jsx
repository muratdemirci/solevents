import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    location: "",
    thumbnail: "",
    category: "",
    description: "",
    startTime: "",
    slug: "",
    hostedBy: "",
  });

  const categories = [
    "decentralized-finance", // for discussions on DeFi projects, protocols, and strategies
    "blockchain-technology", // covering topics related to blockchain technology advancements
    "crypto-gaming", // for events focusing on blockchain-based gaming and virtual worlds
    "nfts-and-digital-art", // discussions and events surrounding Non-Fungible Tokens and digital art on the blockchain
  ];

  const createSlug = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      slug: name === "title" ? createSlug(value) : prevState.slug,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "events"), {
        title: form.title,
        location: form.location,
        category: form.category,
        startTime: form.startTime,
        description: form.description,
        thumbnail: form.thumbnail,
        slug: form.slug,
        userId: localStorage.getItem("user_id"),
        hostedBy: form.hostedBy,
      });
      navigate("/dashboard"); // navigate to some path after successful submission
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setForm({
      title: "",
      location: "",
      thumbnail: "",
      category: "",
      description: "",
      startTime: "",
      isOnline: false,
      link: "",
    });
  };

  return (
    <div className="create_event">
      <Navbar />
      <div style={{ padding: "30px" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#1d5d9b",
          }}
        >
          Create new event
        </h2>
        <form className="create_form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            required
            className="event_title"
          />

          <label htmlFor="isOnline">Online Event</label>
          <input
            type="checkbox"
            name="isOnline"
            id="isOnline"
            checked={form.isOnline}
            onChange={handleChange}
          />

          {form.isOnline ? (
            <>
              <label htmlFor="link">Link</label>
              <input
                type="text"
                name="link"
                id="link"
                value={form.link}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <label htmlFor="link">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label htmlFor="Thumbnail">Thumbnail</label>
          <input
            type="text"
            name="thumbnail"
            id="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            className="event_title"
            required
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                marginRight: "7px",
              }}
            >
              <label htmlFor="startTime">Starting Time</label>
              <input
                type="datetime-local"
                name="startTime"
                id="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="event_title"
                required
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <label htmlFor="category">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="event_title"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label htmlFor="title">Hosted by</label>
          <input
            type="text"
            name="hostedBy"
            id="hostedBy"
            value={form.hostedBy}
            onChange={handleChange}
            required
            className="event_title"
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={8}
            value={form.description}
            onChange={handleChange}
            required
          />

          <button className="createEventBtn" type="submit">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
