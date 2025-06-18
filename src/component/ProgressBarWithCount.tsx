// bootstrap progress bar of game progress
interface Props {
  percent: number;
  currentPosition: number;
}

export default function ProgressBarWithCount({
  percent,
  currentPosition,
}: Props) {
  return (
    <div
      className="progress text-center"
      role="progressbar"
      aria-label="Progress"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-bar" style={{ width: `${percent}%` }}>
        {currentPosition}
      </div>
    </div>
  );
}
