import React, { useEffect, useRef, useState, useReducer } from "react";
import { useLocation } from "../hook/useLocation";
import { Location } from "../class/Location";
import MapComponent from "./MapComponent";
import ReactConfetti from "react-confetti";

interface FootballStadiumManagerProps {
  initialEntities: Location[];
}

interface State {
  randomEntity: Location | null;
  shownIds: number[];
  message: string;
  points: number; // Number of correct answers
  attempts: number;
  attemptsPerRound: number; // Attempts per location
  buttonsDisabled: boolean;
  nextDisabled: boolean;
  totalLocations: number;
  selectedIds: number[]; // Store multiple clicked buttons
  showConfetti: boolean;
}

// Reducer for managing multiple states
const reducer = (
  state: State,
  action: { type: string; payload?: any }
): State => {
  switch (action.type) {
    case "SET_RANDOM":
      return { ...state, randomEntity: action.payload };
    case "UPDATE_PROGRESS": // Track IDs that have already been shown as random selections.
      return { ...state, shownIds: [...state.shownIds, action.payload] };
    case "SET_MESSAGE": // Message to display after a button click.
      return { ...state, message: action.payload };
    case "TOGGLE_BUTTONS": // Tracking disabled buttons.
      return { ...state, buttonsDisabled: action.payload };
    case "UPDATE_SCORE": // New state variables for keeping score/points and counting attempts.
      return { ...state, points: state.points + 1 };
    case "UPDATE_ATTEMPTS": // and counting attempts
      return { ...state, attempts: state.attempts + 1 };
    case "UPDATE_ATTEMPTS_PER_ROUND": // Attempts per location (round)
      return { ...state, attemptsPerRound: state.attemptsPerRound + 1 };
    case "RESET_ATTEMPTS_PER_ROUND": // Reset attempts per location
      return { ...state, attemptsPerRound: 0 };
    case "SET_TOTAL": // Use state for total number of locations; using state ensures a re-render.
      return { ...state, totalLocations: action.payload };
    case "SET_SELECTED": // Store clicked button IDs
      return { ...state, selectedIds: [...state.selectedIds, action.payload] };
    case "CLEAR_SELECTED": // Reset selected buttons
      return { ...state, selectedIds: [] };
    case "TOGGLE_NEXT": // Disabled Next button
      return { ...state, nextDisabled: action.payload };
    case "TOGGLE_CONFETTI": // Confetti for Result page
      return { ...state, showConfetti: action.payload };
    default:
      return state;
  }
};

const FootballStadiumManager: React.FC<FootballStadiumManagerProps> = ({
  initialEntities,
}) => {
  const { entities, addEntity } = useLocation();
  const isInitialized = useRef(false);
  const [state, dispatch] = useReducer(reducer, {
    randomEntity: null,
    shownIds: [],
    message: "",
    points: 0,
    attempts: 0,
    attemptsPerRound: 0,
    buttonsDisabled: false,
    nextDisabled: false,
    totalLocations: 0,
    selectedIds: [],
    showConfetti: false,
  });

  // Initialize entities on first mount.
  useEffect(() => {
    if (!isInitialized.current && initialEntities.length > 0) {
      initialEntities.forEach((entity) => addEntity(entity));
      dispatch({ type: "SET_TOTAL", payload: initialEntities.length }); // Save total into state
      isInitialized.current = true;
    }
  }, [initialEntities, addEntity]);

  // Function to refresh the random selection.
  // It filters out the entities that have been shown before.
  const refreshRandomEntity = () => {
    // Clear the message on refresh and on buttons.
    dispatch({ type: "SET_MESSAGE", payload: "" });
    dispatch({ type: "TOGGLE_BUTTONS", payload: false });
    dispatch({ type: "CLEAR_SELECTED" }); // Reset selected buttons
    dispatch({ type: "RESET_ATTEMPTS_PER_ROUND" }); // Reset attempts per location (round) count
    dispatch({ type: "TOGGLE_NEXT", payload: false }); // re-enable

    // Get only the entities that haven't been shown yet.
    const available = entities.filter(
      (entity) => !state.shownIds.includes(entity.id)
    );
    if (available.length === 0) {
      // If nothing is left, clear the randomEntity so we render the end-of-list message.
      dispatch({ type: "SET_RANDOM", payload: null });
      dispatch({ type: "TOGGLE_CONFETTI", payload: true }); // Enable confetti
      return;
    }

    console.log(available);

    const index = Math.floor(Math.random() * available.length);
    const chosen = available[index];
    dispatch({ type: "SET_RANDOM", payload: chosen });
    dispatch({ type: "UPDATE_PROGRESS", payload: chosen.id });
  };

  // When the entities array is first populated, pick the initial random entity.
  // We run this effect only if no randomEntity is currently set.
  useEffect(() => {
    if (entities.length > 0 && state.randomEntity === null) {
      refreshRandomEntity();
    }
    // We purposely do not add randomEntity as a dependency here so that
    // we only try to select an initial random once entities are available.
  }, [entities]);

  // Handler for clicking a location button.
  // If the clicked location's name matches the randomEntity's name, display "Correct!" and updates score.
  const handleLocationButtonClick = (location: Location) => {
    dispatch({ type: "UPDATE_ATTEMPTS" });
    dispatch({ type: "UPDATE_ATTEMPTS_PER_ROUND" }); // Track attempts per location (round)
    dispatch({ type: "SET_SELECTED", payload: location.id });
    if (state.randomEntity && location.name === state.randomEntity.name) {
      dispatch({ type: "UPDATE_SCORE" });
      dispatch({ type: "SET_MESSAGE", payload: "🎉 Correct!" });
      dispatch({ type: "TOGGLE_BUTTONS", payload: true }); // Off buttons selection
      dispatch({ type: "TOGGLE_NEXT", payload: true }); // re-enable
      setTimeout(() => {
        refreshRandomEntity();
      }, 1500); // Add delay for smoother transition
    } else {
      dispatch({ type: "SET_MESSAGE", payload: "❌ Incorrect!" });
    }
    // Move to next location ONLY after three attempts
    if (state.attemptsPerRound + 1 === 3) {
      dispatch({ type: "TOGGLE_NEXT", payload: true }); // re-enable
      setTimeout(() => {
        refreshRandomEntity();
      }, 1500); // Add delay for smoother transition
    }
  };

  // Compute progress percentage and current position
  const progressPercent =
    state.totalLocations > 0
      ? Math.round((state.shownIds.length / state.totalLocations) * 100)
      : 0;
  const currentPosition = state.shownIds.length;

  const successRate =
    state.totalLocations > 0
      ? Math.min(
          Math.round(
            (state.points / state.attempts) *
              ((state.points / state.totalLocations) * 100)
          ),
          100
        )
      : 0;

  return (
    <div>
      {state.showConfetti && (
        <ReactConfetti recycle={false} numberOfPieces={200} />
      )}
      {state.randomEntity ? (
        <div>
          <div
            className="progress text-center"
            role="progressbar"
            aria-label="Progress"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar"
              style={{ width: `${progressPercent}%` }}
            >
              {currentPosition}
            </div>
          </div>
          <h1 className="display-4">{state.message}</h1>
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col">
                <div>
                  <p>Attempts Remaining : {state.attemptsPerRound} / 3</p>
                  <div className="d-flex justify-content-center gap-2 my-2">
                    {[0, 1, 2].map((idx) => (
                      <span
                        key={idx}
                        className={
                          idx < state.attemptsPerRound ? "life--lost" : ""
                        }
                        style={{
                          fontSize: "32px",
                          transition: "opacity 0.4s ease",
                        }}
                      >
                        ⚽
                      </span>
                    ))}
                  </div>
                  {entities.length > 0 ? (
                    entities.map((location) => (
                      <button
                        className={
                          state.selectedIds.includes(location.id)
                            ? "btn btn-secondary"
                            : "btn btn-primary"
                        }
                        key={location.id}
                        onClick={() => handleLocationButtonClick(location)}
                        disabled={state.buttonsDisabled} // Makes the button unclickable
                        style={{
                          margin: "0.5rem",
                          // Appearance is automatically greyed out for disabled buttons,
                          // but you can customize it via CSS if needed. //todo
                          opacity: state.buttonsDisabled ? 0.5 : 1,
                          cursor: state.buttonsDisabled
                            ? "not-allowed"
                            : "pointer",
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
                  key={state.randomEntity.id}
                  coordinates={[
                    state.randomEntity.coordinates[0],
                    state.randomEntity.coordinates[1],
                  ]}
                  showSymbol={state.randomEntity.showSymbol}
                />
              </div>
              <div className="col">
                <div>
                  <p>
                    <button
                      className="btn btn-primary"
                      disabled={state.nextDisabled}
                      onClick={() => refreshRandomEntity()}
                    >
                      Next Location
                    </button>
                  </p>
                  <p>Correct Answers: {state.points}</p>
                  <p>Attempts: {state.attempts}</p>
                  <p>
                    Progress: {progressPercent}% (Location {currentPosition} of{" "}
                    {state.totalLocations})
                  </p>
                  <p>
                    Coordinates: {state.randomEntity.coordinates[0].toFixed(2)},{" "}
                    {state.randomEntity.coordinates[1].toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You've reached the end of the list, how did you score.</p>
          <div>
            <p>Total Locations: {entities.length}</p>
            <p>Success Rate: {successRate}% (Max 100%)</p>
            <p>Correct Answers: {state.points}</p>
            <p>Attempts: {state.attempts}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FootballStadiumManager;
