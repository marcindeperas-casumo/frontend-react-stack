// @flow
import * as React from "react";
import cx from "classnames";
import { type CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { useTimeoutFn } from "Utils/hooks/useTimeoutFn";
import { RRIconView } from "./views/RRIconView";
import { PositionView } from "./views/PositionView";
import { RemainingSpinsView } from "./views/RemainingSpinsView";
import { PointsView } from "./views/PointsView";

import "./ReelRaceIcon.scss";

type Props = {
  onClick: Function,
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

  const transitionTimer = useTimeoutFn();

  React.useEffect(() => {
    const scheduleClassChange = () =>
      transitionTimer.scheduleIn(
        () => {
          setIsTransitionRunning(true);

          transitionTimer.scheduleIn(() => {
            setIsTransitionRunning(false);

            const nextViewIndexToDisplay = getNextView(nextViewIndex);
            if (nextViewIndexToDisplay !== nextViewIndex) {
              setCurrentViewIndex(nextViewIndex);
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
        "c-reel-race-icon u-position-relative u-height--2xlg u-width--2xlg t-background-grey-90",
        className
      )}
    >
      <CurrentView
        {...currentRace}
        className={cx("c-reel-race-icon__content u-position-absolute", {
          "c-reel-race-icon__content--old": isTransitionRunning,
        })}
      />
      {isTransitionRunning && (
        <NextView
          {...currentRace}
          className={cx("c-reel-race-icon__content u-position-absolute", {
            "c-reel-race-icon__content--next": isTransitionRunning,
          })}
        />
      )}
    </div>
  );
};
