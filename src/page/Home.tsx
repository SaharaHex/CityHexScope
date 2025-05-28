import { useState } from "react";
import MapComponent from "../component/MapComponent";

function Home() {
  const [showSymbol, setShowSymbol] = useState(true);

  return (
    <>
      <MapComponent
        coordinates={[-0.0009164237115796685, 51.502004318563834]}
        showSymbol={showSymbol}
      />
    </>
  );
}

export default Home;
