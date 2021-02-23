// @flow

import React, { useEffect, useState, useContext } from "react";
import { MaximizeIcon, MinimizeIcon } from "@casumo/cmp-icons";
import { isNativeByUserAgent } from "GameProviders";
import { supportsTogglingFullscreen } from "./FullscreenToggle.utils";
import { FullscreenViewContext } from "./FullscreenView";

type Props = {
  elementOverride?: HTMLElement,
};

export const FullscreenToggle = ({ elementOverride }: Props) => {
  const isNative = isNativeByUserAgent();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenElementFromContext = useContext(FullscreenViewContext);
  const fullscreenElement = elementOverride || fullscreenElementFromContext;
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

  if (isNative || !elementSupportsFullscreen) {
    return null;
  }

  return isFullscreen ? (
    <MinimizeIcon onClick={removeFullscreen} />
  ) : (
    <MaximizeIcon onClick={triggerFullscreen} />
  );
};
