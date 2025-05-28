import { useState } from "react";
import MapComponent from "../component/MapComponent";

function FootballStadium() {
  const [showSymbol, setShowSymbol] = useState(false);

  return (
    <>
      <h2>Which Football Stadium is this?</h2>
      <MapComponent
        coordinates={[-0.279672, 51.555973]}
        showSymbol={showSymbol}
      />
    </>
  );
}

export default FootballStadium;
