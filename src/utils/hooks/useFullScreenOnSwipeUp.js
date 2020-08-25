import { useState, useEffect } from "react";

export const useFullScreenOnSwipeUp = () => {
  const [startY, setStartY] = useState(0);

  const onTouchStart = e => {
    const { clientY } = e.touches.length ? e.touches[0] : {};
    setStartY(clientY);
  };

  const onTouchEnd = e => {
    const { clientY } = e.changedTouches.length ? e.changedTouches[0] : {};
    if (
      startY - clientY > 0 &&
      document.body &&
      document.body.requestFullscreen
    ) {
      try {
        document.body.requestFullscreen();
      } catch (err) {
        return null;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  });
};
