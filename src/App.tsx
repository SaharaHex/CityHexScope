import { useState } from "react";
import MapComponent from "./component/MapComponent";

function App() {
  const [showSymbol, setShowSymbol] = useState(true);

  return (
    <>
      <h1>CityHexScope</h1>
      <MapComponent coordinates={[-0.889, 52.231]} showSymbol={showSymbol} />
    </>
  );
}

export default App;
