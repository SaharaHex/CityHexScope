import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "../hook/useLocation";
import { Location } from "../class/Location";
import MapComponent from "./MapComponent";

const FootballStadiumManager: React.FC = () => {
  const { entities, addEntity, removeEntity } = useLocation();
  const isInitialized = useRef(false);
  const [randomEntity, setRandomEntity] = useState<Location | null>(null);
  // Track IDs that have already been shown as random selections.
  const [shownIds, setShownIds] = useState<number[]>([]);
  // Message to display after a button click.
  const [message, setMessage] = useState<string>("");
  // New state variables for keeping score and counting attempts.
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  // Tracking disabled buttons.
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

  // Initialize entities on first mount.
  useEffect(() => {
    if (!isInitialized.current) {
      const initialEntities: Location[] = [
        new Location(1, "Wembley Stadium", [-0.279672, 51.555973], false),
        new Location(2, "Downtown", [-0.0009164237115796685, 51.555973], true),
        new Location(
          3,
          "City",
          [-0.7604461089076843, 52.03967137514232],
          false
        ),
        new Location(
          4,
          "Town",
          [-0.7225089440640504, 52.05239335316649],
          false
        ),
      ];
      initialEntities.forEach((entity) => addEntity(entity));
      isInitialized.current = true;
    }
  }, [addEntity]);

  // Function to refresh the random selection.
  // It filters out the entities that have been shown before.
  const refreshRandomEntity = () => {
    // Clear the message on refresh and on buttons.
    setMessage("");
    setButtonsDisabled(false);

    // Get only the entities that haven't been shown yet.
    const available = entities.filter(
      (entity) => !shownIds.includes(entity.id)
    );
    if (available.length === 0) {
      // If nothing is left, clear the randomEntity so we render the end-of-list message.
      setRandomEntity(null);
      return;
    }
    const index = Math.floor(Math.random() * available.length);
    const chosen = available[index];
    setRandomEntity(chosen);
    setShownIds((prev) => [...prev, chosen.id]);
  };

  // When the entities array is first populated, pick the initial random entity.
  // We run this effect only if no randomEntity is currently set.
  useEffect(() => {
    if (entities.length > 0 && randomEntity === null) {
      refreshRandomEntity();
    }
    // We purposely do not add randomEntity as a dependency here so that
    // we only try to select an initial random once entities are available.
  }, [entities]);

  // Handler for removal: remove the current random entity and then refresh selection. //testing this
  const handleRemoveEntity = () => {
    if (!randomEntity) return;
    removeEntity(randomEntity.id);
    // Attempt to refresh the random selection after removal.
    // (If removal updates the entities state, refreshRandomEntity will pick from the reduced list.)
    refreshRandomEntity();
  };

  // Handler for clicking a location button.
  // If the clicked location's name matches the randomEntity's name, display "Correct!" and updates score.
  const handleLocationButtonClick = (location: Location) => {
    setAttempts((prev) => prev + 1);
    if (randomEntity && location.name === randomEntity.name) {
      setScore((prev) => prev + 1);
      setMessage("Correct!");
      setButtonsDisabled(true); // Off buttons selection
    } else {
      setMessage("Incorrect!");
    }
  };

  return (
    <div>
      {randomEntity ? (
        <div>
          <button onClick={handleRemoveEntity}>Remove</button>
          <button onClick={refreshRandomEntity}>
            Select a Different Location
          </button>
          <p>
            {randomEntity.name} — Coordinates:{" "}
            {randomEntity.coordinates[0].toFixed(2)},{" "}
            {randomEntity.coordinates[1].toFixed(2)}
          </p>
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col">
                <div>
                  {entities.length > 0 ? (
                    entities.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => handleLocationButtonClick(location)}
                        style={{
                          margin: "0.5rem",
                          // Appearance is automatically greyed out for disabled buttons,
                          // but you can customize it via CSS if needed. //todo
                          opacity: buttonsDisabled ? 0.5 : 1,
                          cursor: buttonsDisabled ? "not-allowed" : "pointer",
                        }}
                      >
                        {location.name}
                      </button>
                    ))
                  ) : (
                    <p>No locations available.</p>
                  )}
                </div>
              </div>
              <div className="col">
                {" "}
                <MapComponent
                  key={randomEntity.id}
                  coordinates={[
                    randomEntity.coordinates[0],
                    randomEntity.coordinates[1],
                  ]}
                  showSymbol={randomEntity.showSymbol}
                />
              </div>
              <div className="col">
                <div>
                  <p>Score: {score}</p>
                  <p>Attempts: {attempts}</p>
                </div>
                {message && <p>{message}</p>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>
            No new locations to display. You've reached the end of the list.
          </p>
          <div>
            <p>Total Locations: {entities.length}</p>
            <p>Score: {score}</p>
            <p>Attempts: {attempts}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FootballStadiumManager;
