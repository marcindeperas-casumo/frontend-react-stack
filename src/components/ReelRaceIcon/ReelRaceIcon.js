// @flow
import * as React from "react";
import cx from "classnames";
import { ChevronDownIcon } from "@casumo/cmp-icons";
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
};

const INITIAL_VIEW_CHANGE_INTERVAL_MS = 2 * 1000;
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

export const IconBackground = ({
  children,
  className,
}: {
  children: ?React.Node,
  className?: string,
}) => (
  <div
    className={cx(
      "t-border-r--circle u-height--full u-overflow-hidden u-position-relative u-zindex--content-overlay",
      className
    )}
  >
    {children}
  </div>
);

export const ReelRaceIcon = ({ onClick, currentRace }: Props) => {
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
      onClick={onClick}
      className="c-reel-race-icon u-position-relative u-zindex--content-overlay t-background-grey-90 u-position-relative u-height--2xlg u-width--2xlg
t-border-r--circle t-border--xlg t-border-grey-90 t-opacity-border--25 o-inset-top--none u-margin-top--md o-inset-left--none u-margin-left"
    >
      <IconBackground>
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
      </IconBackground>
      <ChevronDownIcon
        size="sm"
        className="c-reel-race-icon__chevron-icon t-color-black t-background-white u-position-absolute t-border-r--circle"
      />
    </div>
  );
};
