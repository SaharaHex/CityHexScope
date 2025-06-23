import Layout from "./component/Layout";
import Home from "./page/Home";
import UKFootballStadium from "./page/UKFootballStadium";
import WorldFootballStadium from "./page/WorldFootballStadium";
import EuropeanLandmark from "./page/EuropeanLandmark";
import WorldSkyline from "./page/WorldSkyline";

import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/EuropeanLandmark" element={<EuropeanLandmark />} />
          <Route path="/WorldSkyline" element={<WorldSkyline />} />
          <Route path="/UKFootballStadium" element={<UKFootballStadium />} />
          <Route
            path="/WorldFootballStadium"
            element={<WorldFootballStadium />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
