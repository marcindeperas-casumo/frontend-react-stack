// @flow

import React, { useEffect, useState } from "react";
import { FullscreenIcon, CloseFullscreenIcon } from "@casumo/cmp-icons";
import { supportsTogglingFullscreen } from "./FullscreenToggle.utils";

type Props = {
  element: ?HTMLElement,
};

export const FullscreenToggle = ({ element }: Props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const elementSupportsFullscreen = supportsTogglingFullscreen(element);

  const triggerFullscreen = () => {
    if (element && elementSupportsFullscreen) {
      element.requestFullscreen();
    }
  };

  const removeFullscreen = () => {
    document.exitFullscreen();
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  if (!elementSupportsFullscreen) {
    return null;
  }

  return isFullscreen ? (
    <CloseFullscreenIcon onClick={removeFullscreen} />
  ) : (
    <FullscreenIcon onClick={triggerFullscreen} />
  );
};
