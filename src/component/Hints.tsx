// Hints.tsx
import { useState, useEffect } from "react";

interface Props {
  hint?: string;
  locationId: number;
  onReveal?: () => void; //called once, the first time the hint is shown for each new location
}

export default function Hints({ hint, locationId, onReveal }: Props) {
  const [showHint, setShowHint] = useState(false);
  const [hasCounted, setHasCounted] = useState(false);

  // Reset both the visibility and the “counted” flag whenever the location changes (locationId)
  useEffect(() => {
    setShowHint(false);
    setHasCounted(false);
  }, [locationId]);

  const handleHintClick = () => {
    const next = !showHint;
    setShowHint(next);

    // only fire onReveal the very first time, show this hint for this location
    if (next && !hasCounted) {
      onReveal?.();
      setHasCounted(true);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button className="btn btn-outline-info mb-2" onClick={handleHintClick}>
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>

      {showHint && (
        <div
          style={{
            padding: "1rem",
            background: "rgba(255,255,255,0.8)",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontStyle: "italic",
            color: "#333",
          }}
        >
          {hint ?? "No hint available"}
        </div>
      )}
    </div>
  );
}
