import solevents from "../assets/solevents.png";
import { Link, Link as HomeLink } from "react-router-dom";

const LoginButton = () => (
  <Link to="/login">
    <button className="buttons signUpBtn">Login</button>
  </Link>
);

const Navbar = () => {
  return (
    <nav className="navbar">
      <HomeLink to="/">
        <img src={solevents} alt="Solevents" className="logo" />
      </HomeLink>
      <div className="navBtn">
        <LoginButton />
        {/* <button className="buttons signUpBtn">Logout</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
