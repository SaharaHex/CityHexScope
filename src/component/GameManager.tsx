// game controller with all main functions
import MapComponent from "./MapComponent";
import ProgressBarWithCount from "./ProgressBarWithCount";
import ScoreBoard from "../component/ScoreBoard";
import AttemptsTracker from "./AttemptsTracker";
import LocationOptions from "../component/LocationOptions";
import NextButton from "./NextButton";
import StatsDisplay from "./StatsDisplay";
import ConfettiOverlay from "./ConfettiOverlay";
import { useGameManager } from "../hook/useGameManager";

export default function FootballStadiumManager({
  initialEntities,
  topicName,
  topicIcon,
}: {
  initialEntities: any[];
  topicName: string;
  topicIcon: string;
}) {
  const { state, handleClick, refresh, progressPercent, successRate } =
    useGameManager(initialEntities);

  const currentPosition = state.shownIds.length;
  const maxAttempts = 3;

  // result screen
  if (!state.randomEntity && state.showConfetti) {
    return (
      <div className="text-center">
        <p>You've reached the end of the list, how did you score.</p>
        <ConfettiOverlay show />
        <ScoreBoard
          locations={state.totalLocations}
          topic={topicName}
          points={state.points}
          attempts={state.attempts}
          successRate={successRate}
        />
      </div>
    );
  }

  return (
    <div>
      <h3>
        <i className={topicIcon} /> {topicName}
      </h3>

      {/* progress bar with position */}
      <ProgressBarWithCount
        percent={progressPercent}
        currentPosition={currentPosition}
      />

      {/* big centered message */}
      <h1 className="display-4">{state.message}</h1>

      <div className="container text-center">
        <div className="row align-items-start">
          {/* 1️⃣ left: attempts + buttons */}
          <div className="col">
            <AttemptsTracker
              attemptsPerRound={state.attemptsPerRound}
              maxAttempts={maxAttempts}
              topicIcon={topicIcon}
            />

            {initialEntities.length > 0 ? (
              <LocationOptions
                options={initialEntities}
                onClick={handleClick}
                disabled={state.buttonsDisabled}
                selectedIds={state.selectedIds}
              />
            ) : (
              <p>No locations available.</p>
            )}
          </div>

          {/* 2️⃣ center: map */}
          <div className="col">
            {state.randomEntity && (
              <MapComponent
                key={state.randomEntity.id}
                coordinates={[
                  state.randomEntity.coordinates[0],
                  state.randomEntity.coordinates[1],
                ]}
                showSymbol={state.randomEntity.showSymbol}
              />
            )}
          </div>

          {/* 3️⃣ right: next + stats */}
          <div className="col text-start">
            <p>
              <NextButton onNext={refresh} disabled={state.nextDisabled} />
            </p>

            <StatsDisplay
              points={state.points}
              attempts={state.attempts}
              progressPercent={progressPercent}
              currentPosition={currentPosition}
              totalLocations={state.totalLocations}
              coordinates={
                state.randomEntity
                  ? [
                      state.randomEntity.coordinates[0],
                      state.randomEntity.coordinates[1],
                    ]
                  : [0, 0]
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
