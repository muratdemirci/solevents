import header from "../assets/header.av1.mp4";
import { Link as JoinUs } from "react-router-dom";

const Hero = () => {
  const title = "a community events of founders & devs";
  const subtitle = "Join us to collaborate, learn, and grow together";
  const description =
    "Share your ideas, showcase your projects, and contribute to the community";

  return (
    <div className="hero">
      <video src={header} autoPlay muted loop className="video" />
      <div className="content">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <h3>{description}</h3>
        <JoinUs to="/register" className="buttons contentBtn">
          Join us
        </JoinUs>
      </div>
    </div>
  );
};

export default Hero;
