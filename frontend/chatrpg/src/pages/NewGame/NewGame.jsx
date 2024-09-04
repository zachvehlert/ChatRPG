import "./newGame.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="homepage-menu-container">
      <h1>ChatRPG</h1>
      <div className="homepage-button-container">
        <Link to="/game-creator" className="homepage-link-btn">
          New Game
        </Link>
      </div>
      <div className="homepage-button-container">
        <Link to="/" className="homepage-link-btn">
          Load Game
        </Link>
      </div>
    </div>
  );
}