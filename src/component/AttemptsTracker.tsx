// show number of attempts and topic Icon
interface Props {
  attemptsPerRound: number;
  maxAttempts: number;
  topicIcon: string;
}

export default function AttemptsTracker({
  attemptsPerRound,
  maxAttempts,
  topicIcon,
}: Props) {
  return (
    <div>
      <p>
        Attempts Remaining: {attemptsPerRound} / {maxAttempts}
      </p>
      <div className="d-flex justify-content-center gap-2 my-2">
        {Array.from({ length: maxAttempts }).map((_, idx) => (
          <span
            key={idx}
            className={idx < attemptsPerRound ? "life--lost" : ""}
            style={{ fontSize: 32, transition: "opacity 0.4s ease" }}
          >
            {topicIcon}
          </span>
        ))}
      </div>
    </div>
  );
}
