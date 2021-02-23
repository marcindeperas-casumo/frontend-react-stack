// @flow
import React from "react";
import cx from "classnames";

type TReelRaceBoosterPointsValueProps = {
  animating: boolean,
  basePoints: null | string,
  depth?: number,
  extraPoints: null | string,
};

export const ReelRaceBoosterPointsValue = ({
  animating,
  basePoints,
  depth = 3,
  extraPoints,
}: TReelRaceBoosterPointsValueProps) => {
  const commonClasses = "u-font-weight-bold u-margin--none";

  const basePointsClasses = cx(
    "c-boost-points__value c-boost-points__value__base",
    {
      "c-boost-points__value__base--animating": animating,
    },
    commonClasses
  );

  const extraPointsClasses = cx(
    "c-boost-points__value c-boost-points__value__extra",
    {
      "c-boost-points__value__extra--animating": animating,
    },
    commonClasses
  );

  return (
    <>
      {new Array(depth).fill("").map((_, index) => (
        <div
          className="c-reel-race-icon__boost-points__value o-ratio__content "
          key={index}
        >
          {basePoints && <p className={basePointsClasses}>+{basePoints}</p>}
          {extraPoints && <p className={extraPointsClasses}>+{extraPoints}</p>}
        </div>
      ))}
    </>
  );
};
