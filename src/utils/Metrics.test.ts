// test success rate values via vitest
import { describe, it, expect } from "vitest";
import { calculateSuccessRate } from "./Metrics";

describe("calculateSuccessRate()", () => {
  it("Success Rate: High - Medium - Low ", () => {
    expect(calculateSuccessRate(13, 15, 13)).toBe(87); //86.66666667
    expect(calculateSuccessRate(13, 20, 13)).toBe(65);
    expect(calculateSuccessRate(1, 1, 13)).toBe(8); // 7.692307692
  });

  it("rounds and caps at 100%", () => {
    // 120/1 → 120% coverage, but capped to 100
    expect(calculateSuccessRate(120, 1, 100)).toBe(100);
  });

  it("returns zero if no locations", () => {
    expect(calculateSuccessRate(10, 5, 0)).toBe(0);
  });

  it("handles zero attempts (no div-by-zero)", () => {
    // Treat as 0% if they scored some points but never "attempted"
    expect(calculateSuccessRate(5, 0, 10)).toBe(0);
  });
});
