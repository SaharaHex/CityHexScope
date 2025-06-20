import GameManager from "../component/GameManager";
import { Location } from "../class/Location";

const worldFootballStadiums: Location[] = [
  new Location(1, "Santiago Bernabeu", [-3.6883, 40.4531], false), // madrid
  new Location(2, "Signal Iduna Park", [7.4513, 51.4929], false), // dortmund
  new Location(3, "Allianz Arena", [11.6247, 48.2188], false), // munich
  new Location(4, "Estadio Azteca", [-99.1507, 19.3029], false), // mexico city
  new Location(5, "Maracanã", [-43.2302, -22.9121], false), // rio de jeneriro
  new Location(6, "San Siro (Giuseppe Meazza)", [9.1241, 45.4781], false), // milan
  new Location(7, "Estadio BBVA", [-100.2445, 25.6693], false), // monterrey, mexico
  new Location(8, "La Bombonera", [-58.3644, -34.6351], false), // buenos aires, Boca Juniors
  new Location(9, "Soccer City (FNB Stadium)", [27.9826, -26.234], false), // johannesburg
  new Location(10, "Camp Nou", [2.1228, 41.3809], false), // barcelona
  new Location(11, "SoFi Stadium", [-118.3391, 33.9533], false), // los angeles
  new Location(12, "Wanda Metropolitano", [-3.5991, 40.4362], false), // madrid
  new Location(13, "Al Bayt Stadium", [51.4878, 25.6525], false), // al khor, qatar
  new Location(14, "Luzhniki Stadium", [37.5528, 55.7162], false), // moscow
  new Location(15, "Stadio Diego Armando Maradona", [14.193, 40.828], false), // naples
];

function WorldFootballStadium() {
  return (
    <>
      <h2>Which Football Stadium is this?</h2>
      <GameManager
        initialEntities={worldFootballStadiums}
        topicName={"World Football Stadium"}
        topicIcon={"⚽"}
      ></GameManager>
    </>
  );
}

export default WorldFootballStadium;
