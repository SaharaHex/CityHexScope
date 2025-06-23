// useGameManager.test.ts
import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useGameManager } from "./useGameManager";
import { calculateSuccessRate } from "../utils/Metrics";
import type { Location } from "../class/Location";

// Sample initial entities.
const initialEntities: Location[] = [
  {
    id: 1,
    name: "Wembley Stadium",
    coordinates: [-0.279672, 51.555973],
    showSymbol: false,
    hint: "No hint available",
  },
  {
    id: 2,
    name: "Old Trafford",
    coordinates: [-2.291384, 53.463062],
    showSymbol: false,
    hint: "No hint available",
  },
  {
    id: 3,
    name: "Tottenham Hotspur Stadium",
    coordinates: [-0.06602, 51.604249],
    showSymbol: false,
    hint: "No hint available",
  },
];

// Simulated entities storage for the mocked useLocation hook.
let entities: Location[] = [];

// A simple addEntity implementation.
const addEntity = (entity: Location) => {
  entities.push(entity);
};

// Mock the useLocation hook.
vi.mock("../hook/useLocation", () => ({
  useLocation: () => ({
    entities,
    addEntity,
  }),
}));

describe("useGameManager (synchronous click and check output stats)", () => {
  it("initializes with correct total and sets a random entity", async () => {
    const { result } = renderHook(() => useGameManager(initialEntities));

    // Wait until the effect picks a random entity.
    await waitFor(() => result.current.state.randomEntity !== null);

    const { state, progressPercent, successRate } = result.current;
    expect(state.totalLocations).toBe(initialEntities.length);
    // Initially, the refresh function updates shownIds (with one element).
    expect(state.shownIds).toHaveLength(1);
    // Check that the chosen random entity's id is from one of the initial entries.
    expect(initialEntities.map((e) => e.id)).toContain(state.randomEntity?.id);
    expect(progressPercent).toBe(
      Math.round((1 / initialEntities.length) * 100)
    );
    expect(successRate).toBe(
      calculateSuccessRate(state.points, state.attempts, state.totalLocations)
    );
  });

  it("handles a correct click and refreshes immediately", async () => {
    const { result } = renderHook(() => useGameManager(initialEntities));
    await waitFor(() => result.current.state.randomEntity !== null);
    const previousRandomId = result.current.state.randomEntity?.id;

    act(() => {
      result.current.handleClick(result.current.state.randomEntity as Location);
    });

    // Immediately after the click, message and score are updated.
    expect(result.current.state.message).toBe("🎉 Correct!");
    expect(result.current.state.points).toBe(1);
    expect(result.current.state.attempts).toBe(1);
    expect(result.current.state.attemptsPerRound).toBe(1);

    // After the (synchronous) refresh, check that progress is updated.
    await waitFor(() => result.current.state.shownIds.length === 2);
    // The initial random id must be in shownIds.
    expect(result.current.state.shownIds[0]).toEqual(previousRandomId);
    // Its not at the end of list.
    expect(result.current.state.attempts < initialEntities.length).toEqual(
      true
    );
  });

  it("handles an incorrect click without triggering refresh when attempts are below three", async () => {
    const { result } = renderHook(() => useGameManager(initialEntities));
    await waitFor(() => result.current.state.randomEntity !== null);
    const currentRandomId = result.current.state.randomEntity?.id;
    // Create a wrong location.
    const wrongLocation: Location = {
      id: 999,
      name: "Wrong",
      coordinates: [0, 0],
      showSymbol: false,
      hint: "No hint available",
    };

    act(() => {
      result.current.handleClick(wrongLocation);
    });

    expect(result.current.state.message).toBe("❌ Incorrect!");
    expect(result.current.state.selectedIds).toContain(wrongLocation.id);
    expect(result.current.state.points).toBe(0);
    expect(result.current.state.attempts).toBe(1);
    expect(result.current.state.attemptsPerRound).toBe(1);
    // Since attempts are below three, refresh is not triggered – the random entity remains unchanged.
    expect(result.current.state.randomEntity?.id).toEqual(currentRandomId);
  });

  it("three incorrect attempts in a round (disabled UI buttons)", async () => {
    const { result } = renderHook(() => useGameManager(initialEntities));
    await waitFor(() => result.current.state.randomEntity !== null);
    const wrongLocation: Location = {
      id: 999,
      name: "Wrong",
      coordinates: [0, 0],
      showSymbol: false,
      hint: "No hint available",
    };

    // Simulate three incorrect clicks.
    act(() => {
      result.current.handleClick(wrongLocation); // 1st attempt.
    });
    act(() => {
      result.current.handleClick(wrongLocation); // 2nd attempt.
    });
    act(() => {
      result.current.handleClick(wrongLocation); // 3rd attempt.
    });

    expect(result.current.state.nextDisabled).toBe(true);
    expect(result.current.state.buttonsDisabled).toBe(true);
    expect(result.current.state.attemptsPerRound).toBe(3);
  });
});
