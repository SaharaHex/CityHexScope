import GameManager from "../component/GameManager";
import { Location } from "../class/Location";

const worldSkylines: Location[] = [
  new Location(
    1,
    "New York City",
    [-73.9857, 40.7484],
    false,
    14,
    "Empire State Building"
  ),
  new Location(2, "Dubai", [55.2744, 25.1972], false, 14, "Burj Khalifa"),
  new Location(3, "Shanghai", [121.5055, 31.2336], false, 14, "Shanghai Tower"),
  new Location(4, "Tokyo", [139.8107, 35.7101], false, 15, "Skytree"),
  new Location(5, "London", [-0.0865, 51.5045], false, 15, "The Shard"),
  new Location(
    6,
    "Kuala Lumpur",
    [101.7115, 3.1579],
    false,
    15,
    "Petronas Towers"
  ),
  new Location(7, "Toronto", [-79.3871, 43.6426], false, 14, "CN Tower"),
  new Location(
    8,
    "Singapore",
    [103.8607, 1.2834],
    false,
    15,
    "Marina Bay Sands"
  ),
  new Location(9, "Sydney", [151.2153, -33.8568], false, 15, "Opera House"),
  new Location(10, "Frankfurt", [8.6692, 50.1115], false, 14, "Main Tower"),
  new Location(
    11,
    "Hong Kong",
    [114.1628, 22.2793],
    false,
    15,
    "Bank of China Tower"
  ),
  new Location(12, "Seattle", [-122.3493, 47.6205], false, 15, "Space Needle"),
  new Location(13, "Taipei", [121.5645, 25.033], false, 15, "101"),
  new Location(
    14,
    "Philadelphia",
    [-75.1652, 39.9526],
    false,
    14,
    "Comcast Technology Center"
  ),
];

function WorldSkyline() {
  return (
    <>
      <h2>Which city is this Skyline?</h2>
      <GameManager
        initialEntities={worldSkylines}
        topicName={"World Skyline"}
        topicIcon={"🏙️"}
        topicHints={true}
      ></GameManager>
    </>
  );
}

export default WorldSkyline;
