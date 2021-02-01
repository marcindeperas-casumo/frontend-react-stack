// @flow
import React, { useLayoutEffect, useRef, useState } from "react";
import cx from "classnames";
import { getBoostersConfig } from "./const";
import "./ReelRaceBoosterPoints.scss";

type Props = {
  boosters: Object,
};

const boostersConfig = getBoostersConfig();

export const ReelRaceBoosterPoints = ({ boosters = {} }: Props) => {
  const pointsContainerRef = useRef({});
  const [basePointsValue, setBasePointsValue] = useState(0);
  const [extraPointsValue, setExtraPointsValue] = useState(0);
  const [isBaseAnimating, setIsBaseAnimating] = useState(false);
  const [prevBoosters, setPrevBoosters] = useState(0);

  useLayoutEffect(() => {
    const pointsContainer = pointsContainerRef.current;

    // eslint-disable-next-line fp/no-loops, no-unused-vars
    for (const booster in boosters) {
      const currentBooster = boosters[booster] || {};
      const currentBoosterConfig = boostersConfig[booster] || {};

      if (currentBooster && currentBooster !== prevBoosters[booster]) {
        if (
          currentBoosterConfig.extra &&
          currentBooster % currentBoosterConfig.showExtraAfter === 0
        ) {
          setExtraPointsValue(currentBoosterConfig.extra);
        }

        setBasePointsValue(currentBoosterConfig.base);

        // eslint-disable-next-line no-unused-expressions
        pointsContainer?.addEventListener(
          "animationend",
          () => {
            setIsBaseAnimating(false);
            setBasePointsValue(0);
            setExtraPointsValue(0);
          },
          {}
        );

        setIsBaseAnimating(true);
        break;
      }
    }

    setPrevBoosters(boosters);

    return () => {
      // eslint-disable-next-line no-unused-expressions
      pointsContainer?.removeEventListener("animationend", {});
    };
  }, [
    boosters,
    boosters.bigWins,
    boosters.megaWins,
    boosters.triples,
    boosters.wins,
    boosters.winsInARow,
    prevBoosters,
  ]);

  const renderPointsValue = value => {
    const shadowDepth = new Array(3).fill("");

    return shadowDepth.map((_, index) => {
      const isLast = index === shadowDepth.length - 1;

      return (
        <p
          className={`
            c-reel-race-icon__boost-points__value
            u-margin--none
            o-ratio__content
            u-font-weight-bold
            ${isLast ? "t-color-yellow-30" : "t-color-black"}
          `}
        >
          {basePointsValue > 0 && <span>+{basePointsValue}</span>}
          {extraPointsValue > 0 && <span>+{extraPointsValue}</span>}
        </p>
      );
    });
  };

  const pointsContainerClasses = cx(
    "c-reel-race-icon__boost-points o-position--absolute",
    {
      "c-reel-race-icon__boost-points--animating": isBaseAnimating,
    }
  );

  return (
    <div className={pointsContainerClasses} ref={pointsContainerRef}>
      {renderPointsValue()}
    </div>
  );
};
