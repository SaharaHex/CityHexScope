import Layout from "./component/Layout";
import Home from "./page/Home";
import FootballStadium from "./page/FootballStadium";

import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/FootballStadium" element={<FootballStadium />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
