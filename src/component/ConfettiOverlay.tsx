// for game result page
import ReactConfetti from "react-confetti";

interface Props {
  show: boolean;
}
export default function ConfettiOverlay({ show }: Props) {
  if (!show) return null;
  return <ReactConfetti recycle={false} />;
}
