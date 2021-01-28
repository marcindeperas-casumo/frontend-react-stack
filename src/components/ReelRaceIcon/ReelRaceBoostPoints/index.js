import React, { useLayoutEffect, useRef, useState } from "react";
import cx from "classnames";

import "./ReelRaceBoostPoints.scss";

const ReelRaceBoostPoints = ({ points = 0 }) => {
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

  const classes = cx("c-reel-race-icon__boost-points", {
    "--animating": isAnimating,
  });

  return (
    <div className={classes} ref={animationContainer}>
      <p class="c-reel-race-icon__boost-points__value">+{pointDifference}</p>
      <p class="c-reel-race-icon__boost-points__value">+{pointDifference}</p>
      <p class="c-reel-race-icon__boost-points__value">+{pointDifference}</p>
    </div>
  );
};

export default ReelRaceBoostPoints;
