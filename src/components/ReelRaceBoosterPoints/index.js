import React, { useLayoutEffect, useRef, useState } from "react";
import cx from "classnames";

import "./ReelRaceBoosterPoints.scss";

const ReelRaceBoosterPoints = ({ points = 0 }) => {
  const animationContainer = useRef(null);

  const [isAnimating, setIsAnimating] = useState(false);
  const [prevPoints, setPrevPoints] = useState(0);
  const [pointDifference, setPointDifference] = useState(0);

  useLayoutEffect(() => {
    const currentAnimationContainer = animationContainer.current;

    if (Number(points) && Number(points) > 0) {
      setPointDifference(points - prevPoints);
      setPrevPoints(points);
      setIsAnimating(true);

      currentAnimationContainer.addEventListener(
        "animationend",
        () => setIsAnimating(false),
        {}
      );
    }

    return () => {
      currentAnimationContainer.removeEventListener("animationend", {});
    };
  }, [points, prevPoints]);

  const classes = cx("c-reel-race-icon__boost-points o-position--absolute", {
    "--animating": isAnimating,
  });

  return (
    <div className={classes} ref={animationContainer}>
      <p class="c-reel-race-icon__boost-points__value u-margin--none o-ratio__content u-font-weight-bold t-color-black">
        +{pointDifference}
      </p>
      <p class="c-reel-race-icon__boost-points__value u-margin--none o-ratio__content u-font-weight-bold t-color-black">
        +{pointDifference}
      </p>
      <p class="c-reel-race-icon__boost-points__value u-margin--none o-ratio__content u-font-weight-bold t-color-yellow-30">
        +{pointDifference}
      </p>
    </div>
  );
};

export default ReelRaceBoosterPoints;
