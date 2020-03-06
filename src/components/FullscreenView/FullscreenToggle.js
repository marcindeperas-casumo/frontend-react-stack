// @flow

import React, { useEffect, useState, useContext } from "react";
import { FullscreenIcon, CloseFullscreenIcon } from "@casumo/cmp-icons";
import { supportsTogglingFullscreen } from "./FullscreenToggle.utils";
import { FullscreenViewContext } from "./FullscreenView";

type Props = {
  element: ?HTMLElement,
};

export const FullscreenToggle = ({ element }: Props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenElement = useContext(FullscreenViewContext);
  const elementSupportsFullscreen = supportsTogglingFullscreen(
    fullscreenElement
  );

  const triggerFullscreen = () => {
    if (fullscreenElement && elementSupportsFullscreen) {
      fullscreenElement.requestFullscreen();
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
