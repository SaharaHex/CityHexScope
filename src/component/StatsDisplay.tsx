// in game stats on progress
interface Props {
  points: number;
  attempts: number;
  progressPercent: number;
  currentPosition: number;
  totalLocations: number;
  coordinates: [number, number];
}

export default function StatsDisplay({
  points,
  attempts,
  progressPercent,
  currentPosition,
  totalLocations,
  coordinates,
}: Props) {
  return (
    <>
      <p>Correct Answers: {points}</p>
      <p>Attempts: {attempts}</p>
      <p>
        Progress: {progressPercent}% (Location {currentPosition} of{" "}
        {totalLocations})
      </p>
      <p>
        Coordinates: {coordinates[0].toFixed(2)}, {coordinates[1].toFixed(2)}
      </p>
    </>
  );
}
