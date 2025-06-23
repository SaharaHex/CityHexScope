// main game logic
import { useEffect, useReducer, useRef } from "react";
import { useLocation } from "../hook/useLocation";
import { Location } from "../class/Location";
import type { State, Action } from "../type/Game";
import { calculateSuccessRate } from "../utils/Metrics";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_RANDOM":
      return { ...state, randomEntity: action.payload };
    case "UPDATE_PROGRESS": // Track IDs that have already been shown as random selections.
      return { ...state, shownIds: [...state.shownIds, action.payload] };
    case "SET_MESSAGE": // Message to display after a button click.
      return { ...state, message: action.payload };
    case "TOGGLE_BUTTONS": // Tracking disabled buttons.
      return { ...state, buttonsDisabled: action.payload };
    case "UPDATE_SCORE": // Variable for keeping score/points and counting attempts.
      return { ...state, points: state.points + 1 };
    case "UPDATE_ATTEMPTS": // and counting attempts
      return { ...state, attempts: state.attempts + 1 };
    case "UPDATE_ATTEMPTS_PER_ROUND": // Attempts per location (round)
      return { ...state, attemptsPerRound: state.attemptsPerRound + 1 };
    case "RESET_ATTEMPTS_PER_ROUND": // Reset attempts per location
      return { ...state, attemptsPerRound: 0 };
    case "SET_TOTAL": // Total number of locations.
      return { ...state, totalLocations: action.payload };
    case "SET_SELECTED": // Store clicked button IDs
      return { ...state, selectedIds: [...state.selectedIds, action.payload] };
    case "CLEAR_SELECTED": // Reset selected buttons
      return { ...state, selectedIds: [] };
    case "TOGGLE_NEXT": // Disabled Next button
      return { ...state, nextDisabled: action.payload };
    case "TOGGLE_CONFETTI": // Confetti for Result page
      return { ...state, showConfetti: action.payload };
    case "UPDATE_TOTALHINT": // Number of Hints used
      return { ...state, totalHints: state.totalHints + 1 };
    default:
      return state;
  }
};

export function useGameManager(initialEntities: Location[]) {
  const { entities, addEntity } = useLocation();
  const isInit = useRef(false);
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
    totalHints: 0,
  });

  // 1️⃣ initialize entities on first mount.
  useEffect(() => {
    if (!isInit.current && initialEntities.length) {
      initialEntities.forEach(addEntity);
      dispatch({ type: "SET_TOTAL", payload: initialEntities.length }); // Save total into state
      isInit.current = true;
    }
  }, [initialEntities, addEntity]);

  // 2️⃣ pick next entity, refresh the random selection.
  // it filters out the entities that have been shown before.
  const refresh = () => {
    // clear the message on refresh and on buttons.
    dispatch({ type: "SET_MESSAGE", payload: "" });
    dispatch({ type: "TOGGLE_BUTTONS", payload: false });
    dispatch({ type: "CLEAR_SELECTED" }); // reset selected buttons
    dispatch({ type: "RESET_ATTEMPTS_PER_ROUND" }); // reset attempts per location (round) count
    dispatch({ type: "TOGGLE_NEXT", payload: false }); // re-enable

    // get only the entities that haven't been shown yet.
    const available = entities.filter((e) => !state.shownIds.includes(e.id));
    if (!available.length) {
      // if nothing is left, clear the randomEntity so we render the end-of-list message.
      dispatch({ type: "SET_RANDOM", payload: null });
      dispatch({ type: "TOGGLE_CONFETTI", payload: true }); // enable confetti
      return;
    }

    const chosen = available[Math.floor(Math.random() * available.length)];
    dispatch({ type: "SET_RANDOM", payload: chosen });
    dispatch({ type: "UPDATE_PROGRESS", payload: chosen.id });
  };

  // on first load, when the entities array is first populated, pick the initial random entity.
  // run this effect only if no randomEntity is currently set.
  useEffect(() => {
    if (entities.length && state.randomEntity === null) refresh();
  }, [entities]);

  // 3️⃣ handler for clicking a location button.
  // if the clicked location's name matches the randomEntity's name, display "Correct!" and updates score.
  const handleClick = (loc: Location) => {
    dispatch({ type: "UPDATE_ATTEMPTS" });
    dispatch({ type: "UPDATE_ATTEMPTS_PER_ROUND" }); // track attempts per location (round)
    dispatch({ type: "SET_SELECTED", payload: loc.id });

    if (state.randomEntity?.name === loc.name) {
      dispatch({ type: "UPDATE_SCORE" });
      dispatch({ type: "SET_MESSAGE", payload: "🎉 Correct!" });
      dispatch({ type: "TOGGLE_BUTTONS", payload: true }); // off buttons selection
      dispatch({ type: "TOGGLE_NEXT", payload: true }); // re-enable
      setTimeout(refresh, 1500); // add delay for smoother transition
    } else {
      dispatch({ type: "SET_MESSAGE", payload: "❌ Incorrect!" });
    }
    // move to next location ONLY after three attempts
    if (state.attemptsPerRound + 1 >= 3) {
      dispatch({ type: "TOGGLE_NEXT", payload: true }); // re-enable
      dispatch({ type: "TOGGLE_BUTTONS", payload: true }); // disable now
      setTimeout(refresh, 1500); // add delay for smoother transition
    }
  };

  // expose this helper
  const bumpHintCount = () => dispatch({ type: "UPDATE_TOTALHINT" });

  // 4️⃣ calculate progress percentage, and success rate
  const progressPercent = state.totalLocations
    ? Math.round((state.shownIds.length / state.totalLocations) * 100)
    : 0;
  const successRate = calculateSuccessRate(
    state.points,
    state.attempts,
    state.totalLocations
  );

  return {
    state,
    refresh,
    handleClick,
    progressPercent,
    bumpHintCount,
    successRate,
  };
}
