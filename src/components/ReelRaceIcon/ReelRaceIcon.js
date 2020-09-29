// @flow
import * as React from "react";
import cx from "classnames";
import { useTranslationsGql } from "Utils/hooks";
import { CMS_SLUGS as CMS_SLUG } from "Models/playing/playing.constants";
import { type CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { useTimeoutFn } from "Utils/hooks/useTimeoutFn";
import { ProgressCircle } from "Components/Progress/ProgressCircle";
import { useReelRaceProgress } from "Utils/hooks/useReelRaceProgress";
import { getProgressColor } from "Models/reelRaces";
import { RRIconView } from "./views/RRIconView";
import { PositionView } from "./views/PositionView";
import { RemainingSpinsView } from "./views/RemainingSpinsView";
import { PointsView } from "./views/PointsView";

import "./ReelRaceIcon.scss";

type Props = {
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void,
  currentRace: ?CurrentReelRaceInfo,
  className?: string,
};

const INITIAL_VIEW_CHANGE_INTERVAL_MS = 3 * 1000;
const VIEW_CHANGE_INTERVAL_MS = 5 * 1000;
const VIEW_CHANGE_TRANSITION_MS = 1 * 1000;

export const rrViews = [
  RRIconView,
  PositionView,
  RemainingSpinsView,
  PointsView,
];

export const getNextView = (
  currentView: number,
  numberOfViews: number = rrViews.length
) => {
  const newView = (currentView + 1) % numberOfViews;

  return newView === 0 && numberOfViews > 1 ? 1 : newView;
};

export const ReelRaceIcon = ({ onClick, currentRace, className }: Props) => {
  const [currentViewIndex, setCurrentViewIndex] = React.useState(0);
  const [nextViewIndex, setNextViewIndex] = React.useState(
    getNextView(currentViewIndex)
  );
  const [isTransitionRunning, setIsTransitionRunning] = React.useState(false);

  const { t } = useTranslationsGql({
    reel_races_drawer_pts: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_pts`,
  });
  const gameProgress = useReelRaceProgress(currentRace);

  const viewProps = {
    ...currentRace,
    pointsText: t.reel_races_drawer_pts,
  };

  const transitionTimer = useTimeoutFn();

  React.useEffect(() => {
    const scheduleClassChange = () =>
      transitionTimer.scheduleIn(
        () => {
          if (currentViewIndex === nextViewIndex) {
            return;
          }
          setIsTransitionRunning(true);

          transitionTimer.scheduleIn(() => {
            setIsTransitionRunning(false);

            const nextViewIndexToDisplay = getNextView(nextViewIndex);
            setCurrentViewIndex(nextViewIndex);

            if (nextViewIndexToDisplay !== nextViewIndex) {
              setNextViewIndex(nextViewIndexToDisplay);
              scheduleClassChange();
            }
          }, VIEW_CHANGE_TRANSITION_MS);
        },
        currentViewIndex === 0
          ? INITIAL_VIEW_CHANGE_INTERVAL_MS
          : VIEW_CHANGE_INTERVAL_MS
      );
    scheduleClassChange();

    return () => {
      transitionTimer.clear();
    };
  }, [currentViewIndex, transitionTimer, nextViewIndex]);

  const CurrentView = rrViews[currentViewIndex];
  const NextView = rrViews[nextViewIndex];
  return (
    <div
      className={cx(
        "c-reel-race-icon u-position-relative u-height--3xlg u-width--3xlg t-border-r--circle",
        className
      )}
    >
      <div className="c-reel-race-icon__info u-height--2xlg u-width--2xlg t-background-grey-90 u-overflow-hidden t-border-r--circle t-background-grey-90">
        <CurrentView
          {...viewProps}
          className={cx("c-reel-race-icon__content u-position-absolute", {
            "c-reel-race-icon__content--old": isTransitionRunning,
          })}
        />
        {isTransitionRunning && (
          <NextView
            {...viewProps}
            className={cx("c-reel-race-icon__content u-position-absolute", {
              "c-reel-race-icon__content--next": isTransitionRunning,
            })}
          />
        )}
      </div>
      <ProgressCircle
        value={gameProgress}
        fgColor={getProgressColor(gameProgress)}
        bgColor="grey-50"
        className="c-reel-race-icon__progress t-opacity-color--25 u-height--3xlg u-width--3xlg u-position-absolute"
        width={4}
        radius={24}
      />
    </div>
  );
};
