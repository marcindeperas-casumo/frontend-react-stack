// @flow
import React from "react";

type TReelRaceBoosterPointsValueProps = {
  basePoints: null | String,
  depth?: number,
  extraPoints: null | String,
};

export const ReelRaceBoosterPointsValue = ({
  basePoints,
  depth = 3,
  extraPoints,
}: TReelRaceBoosterPointsValueProps) => {
  return (
    <>
      {new Array(depth).fill("").map((_, index) => (
        <p
          className="c-reel-race-icon__boost-points__value u-margin--none o-ratio__content u-font-weight-bold"
          key={index}
        >
          {basePoints && <span>+{basePoints}</span>}
          {extraPoints && <span>+{extraPoints}</span>}
        </p>
      ))}
    </>
  );
};
