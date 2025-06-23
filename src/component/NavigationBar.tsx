// menu and navigation bar
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background:
          "linear-gradient(to right,rgb(124, 250, 145),rgb(231, 138, 172))",
      }}
    >
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/EuropeanLandmark" ? "active" : ""
                }`}
                to="/EuropeanLandmark"
              >
                European Landmarks
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/UKFootballStadium" ? "active" : ""
                }`}
                to="/UKFootballStadium"
              >
                UK Football Stadiums
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/WorldFootballStadium" ? "active" : ""
                }`}
                to="/WorldFootballStadium"
              >
                World Football Stadiums
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
