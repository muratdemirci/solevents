import CategoriesSection from "../components/CategoriesSection";
import EventsSection from "../components/EventsSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { generateID } from "../utils/util";

const Home = () => {
  useEffect(() => {
    //TODO: change this
    if (!localStorage.getItem("user_id")) {
      localStorage.setItem("user_id", generateID());
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <EventsSection />
      <CategoriesSection />
      <Footer />
    </div>
  );
};

export default Home;
