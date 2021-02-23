// @flow
import * as React from "react";
import cx from "classnames";
import { useTranslations } from "Utils/hooks";
import { CMS_SLUGS as CMS_SLUG } from "Models/playing/playing.constants";
import { type CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { useReelRaceProgress } from "Utils/hooks/useReelRaceProgress";
import { useTimeoutFn } from "Utils/hooks/useTimeoutFn";
import { ProgressCircle } from "Components/Progress/ProgressCircle";
import {
  getProgressColor,
  useGameActivityAwareIconLeaderboard,
} from "Models/reelRaces";
import { ReelRaceBoosterPoints } from "Components/ReelRaceBoosterPoints";
import { RRIconView } from "./views/RRIconView";
import { PositionView } from "./views/PositionView";
import { RemainingSpinsView } from "./views/RemainingSpinsView";
import { PointsView } from "./views/PointsView";

import "./ReelRaceIcon.scss";

type Props = {
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void,
  currentRace: ?CurrentReelRaceInfo,
  className?: string,
};

export const ReelRaceIcon = ({ onClick, currentRace, className }: Props) => {
  if (!currentRace) {
    return null;
  }

  return (
    <div
      className={cx(
        "c-reel-race-icon u-position-relative u-height--3xlg u-width--3xlg",
        className
      )}
    >
      <AnimatedReelRaceWidget />
      <RRProgress currentRace={currentRace} />
      <RRBoosterPoints />
    </div>
  );
};

function RRBoosterPoints() {
  const userLeaderboard = useGameActivityAwareIconLeaderboard();

  return <ReelRaceBoosterPoints {...userLeaderboard.boosters} />;
}

function RRProgress({ currentRace }: { currentRace: CurrentReelRaceInfo }) {
  const gameProgress = useReelRaceProgress(currentRace);

  return (
    <ProgressCircle
      value={gameProgress}
      fgColor={getProgressColor(gameProgress)}
      bgColor="grey-50"
      className="t-opacity-color--25 u-height--3xlg u-width--3xlg u-position-absolute u-top-0 u-left-0"
      width={4}
      radius={24}
    />
  );
}

const INITIAL_VIEW_CHANGE_INTERVAL_MS = 3 * 1000;
const VIEW_CHANGE_INTERVAL_MS = 5 * 1000;

export const getNextView = (currentView: number, numberOfViews: number = 4) => {
  const newView = (currentView + 1) % numberOfViews;

  return newView === 0 && numberOfViews > 1 ? 1 : newView;
};

const animationClasses = {
  in: "c-reel-race-icon__content--next",
  out: "c-reel-race-icon__content--old",
};
const baseClasses =
  "u-height--2xlg u-width--2xlg u-position-absolute u-top-0 u-left-0";
const widgetEntryClasses =
  "o-flex--vertical o-flex-align--center o-flex-justify--center";
function AnimatedReelRaceWidget() {
  const activeView = React.useRef<number>(0);
  const t = useTranslations<{ reel_races_drawer_pts: string }>(
    CMS_SLUG.MODAL_WAGERING
  );
  const userLeaderboard = useGameActivityAwareIconLeaderboard();

  const refs = [React.useRef(), React.useRef(), React.useRef(), React.useRef()];
  const timer = useTimeoutFn();

  const refreshProgress = React.useCallback(() => {
    const nextView = getNextView(activeView.current);
    if (!refs[activeView.current].current) {
      return;
    }

    // animate out current view
    const activeViewClassList = refs[activeView.current].current.classList;
    const animationInClass = Array.from(activeViewClassList).find(
      x => x === animationClasses.in
    );
    animationInClass && activeViewClassList.remove(animationInClass);
    activeViewClassList.add(animationClasses.out);

    // animate in next view
    if (!refs[nextView].current) {
      return;
    }
    const nextViewClassList = refs[nextView].current.classList;
    nextViewClassList.add(animationClasses.in);

    // eslint-disable-next-line fp/no-mutation
    activeView.current = nextView;

    timer.scheduleIn(refreshProgress, VIEW_CHANGE_INTERVAL_MS);
  }, [refs, timer]);

  React.useEffect(() => {
    timer.scheduleIn(refreshProgress, INITIAL_VIEW_CHANGE_INTERVAL_MS);

    return () => {
      timer.clear();
    };
  }, [refreshProgress, timer]);

  return (
    <div
      className={cx(
        baseClasses,
        "u-margin--sm t-border-r--circle u-overflow--hidden t-opacity-background--100 t-background-grey-90"
      )}
    >
      <div ref={refs[0]} className={cx(baseClasses, widgetEntryClasses)}>
        <RRIconView />
      </div>
      <div
        ref={refs[1]}
        className={cx(
          baseClasses,
          widgetEntryClasses,
          "c-reel-race-icon__content--off"
        )}
      >
        <PositionView position={userLeaderboard.position} />
      </div>
      <div
        ref={refs[2]}
        className={cx(
          baseClasses,
          widgetEntryClasses,
          "c-reel-race-icon__content--off"
        )}
      >
        <RemainingSpinsView remainingSpins={userLeaderboard.remainingSpins} />
      </div>
      <div
        ref={refs[3]}
        className={cx(
          baseClasses,
          widgetEntryClasses,
          "c-reel-race-icon__content--off"
        )}
      >
        <PointsView
          points={userLeaderboard.points}
          pointsText={t?.reel_races_drawer_pts}
        />
      </div>
    </div>
  );
}
