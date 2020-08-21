import { useState, useEffect } from "react";

export const useFullScreenOnSwipeUp = () => {
  const [startY, setStartY] = useState(0);

  const onTouchStart = e => {
    setStartY(e.touches[0].clientY);
  };

  const onTouchEnd = e => {
    const yUp = e.changedTouches[0].clientY;
    if (startY - yUp > 0 && document.body && document.body.requestFullscreen) {
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
