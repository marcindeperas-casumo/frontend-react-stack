// @flow
import React, { useLayoutEffect, useRef, useState } from "react";
import cx from "classnames";
import { getBoostersConfig } from "./const";
import "./ReelRaceBoosterPoints.scss";

type Boosters = {
  bigWins: Number,
  megaWins: Number,
  triples: Number,
  wins: Number,
};

const boostersConfig = getBoostersConfig();

export const ReelRaceBoosterPoints = ({
  bigWins,
  megaWins,
  triples,
  wins,
}: Boosters) => {
  const pointsContainerRef = useRef({});
  const [basePointsValue, setBasePointsValue] = useState(0);
  const [extraPointsValue, setExtraPointsValue] = useState(0);
  const [isPointsAnimating, setIsPointsAnimating] = useState(false);
  const [prevBoosters, setPrevBoosters] = useState({});

  useLayoutEffect(() => {
    const boosters = { bigWins, megaWins, triples, wins };
    const pointsContainer = pointsContainerRef.current || {};

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

        if (typeof pointsContainer.addEventListener === "function") {
          pointsContainer.addEventListener(
            "animationend",
            () => {
              setIsPointsAnimating(false);
              setBasePointsValue(0);
              setExtraPointsValue(0);
            },
            {}
          );
        }

        setIsPointsAnimating(true);
        break;
      }
    }

    setPrevBoosters(boosters);

    return () => {
      if (typeof pointsContainer.removeEventListener === "function") {
        pointsContainer.removeEventListener("animationend", {});
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bigWins, megaWins, triples, wins]);

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

  return (
    <div
      className={cx("c-reel-race-icon__boost-points o-position--absolute", {
        "c-reel-race-icon__boost-points--animating": isPointsAnimating,
      })}
      ref={pointsContainerRef}
    >
      {renderPointsValue()}
    </div>
  );
};
