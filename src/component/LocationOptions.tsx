// buttons for all available locations
import { Location } from "../class/Location";

interface Props {
  options: Location[];
  onClick: (loc: Location) => void;
  disabled: boolean;
  selectedIds: number[];
}

export default function LocationOptions({
  options,
  onClick,
  disabled,
  selectedIds,
}: Props) {
  return (
    <div className="btn-group flex-wrap">
      {options.map((loc) => (
        <button
          key={loc.id}
          className={
            "btn m-1 " +
            (selectedIds.includes(loc.id)
              ? "btn-secondary"
              : "btn-outline-primary")
          }
          disabled={disabled} // makes the button unclickable
          onClick={() => onClick(loc)}
        >
          {loc.name}
        </button>
      ))}
    </div>
  );
}
