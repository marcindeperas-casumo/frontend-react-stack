import React from "react";
import { useScreenOrientation } from "Utils/hooks/useScreenOrientation";
import Image from "./backgroundRaysDefault.svg";
import "./RotatingRays.scss";

export const RotatingRays = () => {
  const { isLandscapeOriented } = useScreenOrientation();
  const size = isLandscapeOriented() ? "100vw" : "100vh";

  return (
    <div className="c-rotating-rays__positioner c-scale-in o-position--absolute u-width--screen u-height--screen">
      <Image
        height={size}
        width={size}
        className="c-intro-step__rotating-rays o-position--absolute"
      />
    </div>
  );
};
