import { useState } from "react";
import MapComponent from "../component/MapComponent";

function Home() {
  const [showSymbol] = useState(true);

  return (
    <>
      <div>
        <h3>
          Welcome to this guessing game, of different locations. Choose a topic
          from the above menu to begin❗
        </h3>

        <div className="container text-center p-4">
          <div className="row align-items-start">
            {/* 1️⃣ left: attempts + buttons */}
            <div className="col text-start">
              <p>🧩 How to Play</p>
              <ul className="list-group">
                <li className="list-group-item">
                  🧭 <strong>Pick a topic</strong> from the menu above
                </li>
                <li className="list-group-item">
                  🔷 A location will appear in the{" "}
                  <strong>center hexagon</strong>
                </li>
                <li className="list-group-item">
                  🎯 <strong>Guess the location</strong> by clicking one of the
                  buttons on the left
                </li>
                <li className="list-group-item">
                  ✅ If correct it will move on to{" "}
                  <strong>next location</strong>
                </li>
                <li className="list-group-item">
                  🔄 You have <strong>three attempts</strong> per location
                </li>
                <li className="list-group-item">
                  ⏭️ Use the button labelled <em>Next</em> on the right-hand
                  side to <strong>skip</strong> ahead
                </li>
                <li className="list-group-item">
                  📊 Check your <strong>progress and stats</strong> on the right
                </li>
                <li className="list-group-item">
                  💡 Need a <strong>clue?</strong> Look out for hint buttons on
                  some topics!
                </li>
                <li className="list-group-item">
                  🏁 Once all locations are completed, you'll see your{" "}
                  <strong>Success Rate</strong> on the results page
                </li>
                <li className="list-group-item">
                  🎉 <strong>Good luck!</strong>
                </li>
              </ul>
            </div>

            {/* 2️⃣ center: map */}
            <div
              className="col d-flex align-items-center justify-content-center"
              style={{ height: "51vh" }}
            >
              <MapComponent
                coordinates={[0.0032134873187627607, 51.50299894195837]} // the Millennium Dome
                showSymbol={showSymbol}
                zoom={16}
              />
            </div>

            {/* 3️⃣ right: next + stats */}
            <div className="col text-start">
              <p>
                The location displayed in the hexagon is, “The Millennium Dome”
                in London
              </p>
              <hr />
              <p>
                This <em>web app</em> was built with React, TypeScript, and
                Vite, styled using Bootstrap and custom CSS.
              </p>
              <p>
                Map data and location services are powered by OpenFreeMap (
                <a href="https://openfreemap.org/">openfreemap.org</a>).
              </p>
              <hr />
              <p>
                Explore more projects and challenges by SaharaHex on the
                developer blog: <a href="https://saharahex.uk/">saharahex.uk</a>
              </p>
              <a href="https://saharahex.uk/">
                <img
                  src="https://saharahex.uk/wp-content/uploads/2025/02/saharahexy-1.png"
                  className="img-fluid"
                  alt="Responsive image"
                ></img>
              </a>
              <hr />
              <footer className="footer-text">
                Version 1.0 Beta (Jun 2025)
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
