import GameManager from "../component/GameManager";
import { Location } from "../class/Location";

const europeanLandmarks: Location[] = [
  new Location(1, "Paris", [2.295, 48.8738], false, 16, "Arc de Triomphe"),
  new Location(2, "Pisa", [10.3964, 43.7231], false, 16, "Leaning Tower"),
  new Location(3, "Rome", [12.4922, 41.8902], false, 16, "Colosseum"),
  new Location(4, "Berlin", [13.3777, 52.5163], false, 16, "Brandenburg Gate"),
  new Location(5, "London", [-0.1246, 51.5007], false, 16, "Big Ben"),
  new Location(6, "Barcelona", [2.1744, 41.4036], false, 16, "Sagrada Família"),
  new Location(7, "Athens", [23.7265, 37.9715], false, 16, "Acropolis"),
  new Location(8, "Prague", [14.4114, 50.0865], false, 16, "Charles Bridge"),
  new Location(9, "Brussels", [4.3416, 50.8949], false, 16, "Atomium"),
  new Location(
    10,
    "Vienna",
    [16.3122, 48.1845],
    false,
    16,
    "Schönbrunn Palace"
  ),
  new Location(11, "Amsterdam", [4.8852, 52.36], false, 16, "Rijksmuseum"),
  new Location(
    12,
    "Moscow",
    [37.6208, 55.7525],
    false,
    16,
    "Saint Basil's Cathedral"
  ),
  new Location(13, "Istanbul", [28.9799, 41.0086], false, 16, "Hagia Sophia"),
];

function EuropeanLandmark() {
  return (
    <>
      <h2>Which city is this European Landmark?</h2>
      <GameManager
        initialEntities={europeanLandmarks}
        topicName={"European Landmark"}
        topicIcon={"🏛️"}
        topicHints={true}
      ></GameManager>
    </>
  );
}

export default EuropeanLandmark;
