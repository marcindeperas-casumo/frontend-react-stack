import React from "react";
import OverlayImage from "./transitionOverlayWheel.svg";

import "./TransitionStep.scss";

const duration = 1200;

export const TransitionStep = ({ onShowNext, onTransition }) => {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    setTimeout(() => {
      onTransition();
    }, duration / 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const width = Math.hypot(size.width, size.height) * 2;

  return (
    <div className="c-transition-layer o-position--absolute u-width--full u-height--full u-overflow--hidden">
      <div
        style={{
          width,
          height: width,
          left: `-${width / 2}px`,
          top: `calc(100% - ${width / 2}px)`,
        }}
        className="o-position--absolute"
      >
        <OverlayImage
          style={{ animationDuration: `${duration}ms` }}
          onAnimationEnd={onShowNext}
          className="c-rotate-layer"
        />
      </div>
    </div>
  );
};
