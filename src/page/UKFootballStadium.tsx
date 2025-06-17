import GameManager from "../component/GameManager";
import { Location } from "../class/Location";

const ukFootballStadiums: Location[] = [
  new Location(1, "Wembley Stadium", [-0.279672, 51.555973], false),
  new Location(2, "Old Trafford", [-2.291384, 53.463062], false),
  new Location(3, "Tottenham Hotspur Stadium", [-0.06602, 51.604249], false),
  new Location(4, "Anfield", [-2.960732, 53.431026], false),
  new Location(5, "Emirates Stadium", [-0.108611, 51.5549], false),
  new Location(6, "Etihad Stadium", [-2.200366, 53.483132], false),
  new Location(7, "St James' Park", [-1.621587, 54.974232], false),
  new Location(8, "Villa Park", [-1.885006, 52.509076], false),
  new Location(9, "St Mary's Stadium", [-1.39087, 50.905848], false),
  new Location(10, "Celtic Park", [-4.20556, 55.84972], false),
  new Location(11, "Hampden Park", [-4.25194, 55.82583], false),
  new Location(12, "Cardiff City Stadium", [-3.203, 51.472], false),
  new Location(13, "Swansea Stadium", [-3.935, 51.642], false),
];

function UKFootballStadium() {
  return (
    <>
      <h2>Which UK Football Stadium is this?</h2>
      <GameManager
        initialEntities={ukFootballStadiums}
        topicName={"UK Football Stadium"}
        topicIcon={"⚽"}
      ></GameManager>
    </>
  );
}

export default UKFootballStadium;
