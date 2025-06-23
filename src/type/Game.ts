// game parameters
import { Location } from "../class/Location";

export interface State {
  randomEntity: Location | null;
  shownIds: number[];
  message: string;
  points: number;
  attempts: number;
  attemptsPerRound: number;
  buttonsDisabled: boolean;
  nextDisabled: boolean;
  totalLocations: number;
  selectedIds: number[];
  showConfetti: boolean;
  totalHints: number;
}

export interface GameManagerProps {
  initialEntities: Location[];
  topicName: string;
  topicIcon: string;
  topicHints: boolean;
}

export type Action =
  | { type: "SET_RANDOM"; payload: Location | null }
  | { type: "UPDATE_PROGRESS"; payload: number } // Track IDs that have already been shown as random selections.
  | { type: "SET_MESSAGE"; payload: string } // Message to display after a button click.
  | { type: "TOGGLE_BUTTONS"; payload: boolean } // Tracking disabled buttons.
  | { type: "UPDATE_SCORE" } // Variable for keeping score/points and counting attempts.
  | { type: "UPDATE_ATTEMPTS" } // and counting attempts
  | { type: "UPDATE_ATTEMPTS_PER_ROUND" } // Attempts per location (round)
  | { type: "RESET_ATTEMPTS_PER_ROUND" } // Reset attempts per location
  | { type: "SET_TOTAL"; payload: number } // Total number of locations.
  | { type: "SET_SELECTED"; payload: number } // Store clicked button IDs
  | { type: "CLEAR_SELECTED" } // Reset selected buttons
  | { type: "TOGGLE_NEXT"; payload: boolean } // Disabled Next button
  | { type: "TOGGLE_CONFETTI"; payload: boolean } // Confetti for Result page
  | { type: "UPDATE_TOTALHINT" }; // Number of Hints used
