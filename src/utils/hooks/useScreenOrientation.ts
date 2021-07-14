import { useState, useEffect } from "react";
import { isLandscapeMode } from "Components/ResponsiveLayout/ResponsiveLayout";

export function useScreenOrientation() {
  const [orientation, setOrientation] = useState<
    "landscape" | "portrait" | undefined
  >();

  const setScreenOrientation = () =>
    setOrientation(isLandscapeMode() ? "landscape" : "portrait");

  const isLandscapeOriented = () => orientation === "landscape";
  const isPortraitOriented = () => orientation === "portrait";

  useEffect(() => {
    setScreenOrientation();
    window.addEventListener("resize", setScreenOrientation);

    return () => {
      window.removeEventListener("resize", setScreenOrientation);
    };
  }, []);

  return {
    orientation,
    isLandscapeOriented,
    isPortraitOriented,
  };
}
