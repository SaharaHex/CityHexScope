// work of success rate
export function calculateSuccessRate(
  points: number,
  attempts: number,
  totalLocations: number
): number {
  const coverage = totalLocations > 0 ? (points / totalLocations) * 100 : 0;

  const successRate = Math.min(Math.round((points / attempts) * coverage), 100);
  return successRate;
}
