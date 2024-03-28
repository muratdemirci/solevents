import {
  FaChartLine,
  FaPaintBrush,
  FaBasketballBall,
  FaCookieBite,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const categories = [
  {
    path: "/events/decentralized-finance",
    icon: <FaChartLine />,
    name: "Decentralized Finance",
  },
  {
    path: "/events/blockchain-technology",
    icon: <FaCookieBite />,
    name: "Blockchain Technology",
  },
  {
    path: "/events/crypto-gaming",
    icon: <FaBasketballBall />,
    name: "Crypto Gaming",
  },
  {
    path: "/events/nfts-and-digital-art",
    icon: <FaPaintBrush />,
    name: "NFTs and Digital Art",
  },
];

const CategoriesSection = () => {
  return (
    <div className="home_events">
      <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>
        Find events by categories
      </h1>
      <div className="categories_events">
        {categories.map((category, index) => (
          <Link key={index} to={category.path}>
            <p>
              {category.icon} {category.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
