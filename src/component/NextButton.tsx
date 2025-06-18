// move to next location / skip button
interface Props {
  onNext: () => void;
  disabled: boolean;
}

export default function NextButton({ onNext, disabled }: Props) {
  return (
    <button
      className="btn btn-success my-3"
      onClick={onNext}
      disabled={disabled} // makes the button unclickable
    >
      Next
    </button>
  );
}
