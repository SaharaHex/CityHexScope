// end result of game
interface Props {
  locations: number;
  topic: string;
  points: number;
  attempts: number;
  successRate: number;
}

export default function ScoreBoard({
  locations,
  topic,
  points,
  attempts,
  successRate,
}: Props) {
  const getResultText = (): string => {
    if (successRate === 100) {
      return "🏅 Top marks!";
    } else if (successRate > 80) {
      return "🥳 Great job!";
    } else if (successRate > 50) {
      return "🙂 Good work!";
    } else if (successRate > 40) {
      return "👍 Getting there!";
    } else if (successRate > 30) {
      return "😕 Need improving";
    } else {
      return "🤔 Well you tried";
    }
  };

  return (
    <div className="col text-start">
      <p>🌐 Total Locations: {locations}</p>
      <p>📌 Topic: {topic}</p>
      <p>✔️ Correct Answers: {points}</p>
      <p>🎯 Attempts: {attempts}</p>
      <p>🏆 Success Rate: {successRate}%</p>
      <h3>Result: {getResultText()}</h3>
    </div>
  );
}
