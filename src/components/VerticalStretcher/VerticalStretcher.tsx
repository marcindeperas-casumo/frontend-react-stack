import debounce from "lodash.debounce";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";
import { isMobileByPlatform } from "Utils";
import { isNativeByUserAgent } from "GameProviders";
import type { GameProviderModel } from "GameProviders";
import { SwipeUpPanelContainer } from "./SwipeUpPanelContainer";
import "./VerticalStretcher.scss";

export type Props = {
  children?: React.ReactChild | React.ReactChild[];
  swipeUpPanelEnabled?: boolean;
  gameProviderModel: GameProviderModel;
  quickDepositInProgress: boolean;
  fullScreenElement?: HTMLElement;
};
const heightWithForcedScrol = "calc(100vh + 20px)";
const screenHeight = "100vh";
const resetTop = "0px";
const extraMarginTop = "50px";

const expandBody = () => {
  if (document.body && Math.abs(window.orientation as number) === 0) {
    /* eslint-disable-next-line fp/no-mutation */
    document.body.style.height = heightWithForcedScrol;
    /* eslint-disable-next-line fp/no-mutation */
    document.body.style.top = resetTop;
  }

  // Landscape mode rules
  if (Math.abs(window.orientation as number) === 90) {
    /* eslint-disable-next-line fp/no-mutation */
    document.body.style.height = screenHeight;
    // eslint-disable-next-line fp/no-mutation
    document.body.style.top = extraMarginTop;
    window.scrollTo(0, 0);
  }
};
const shrinkBody = () => {
  if (document.body && Math.abs(window.orientation as number) === 0) {
    // eslint-disable-next-line fp/no-mutation
    document.body.style.top = resetTop;
  }

  // Landscape mode rules
  if (Math.abs(window.orientation as number) === 90) {
    // eslint-disable-next-line fp/no-mutation
    document.body.style.top = extraMarginTop;
    // eslint-disable-next-line fp/no-mutation
    document.body.style.height = screenHeight;
  }
};
export const VerticalStretcher = ({
  children,
  swipeUpPanelEnabled = false,
  gameProviderModel,
  quickDepositInProgress,
  fullScreenElement = document.body,
}: Props) => {
  const heightContainer = useRef(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showSwipePanel, setShowSwipePanel] = useState(false);
  const measure = document.getElementById("height-measure");
  const isNative = isNativeByUserAgent();
  const isMobile = isMobileByPlatform();
  const debouncedScrollToTop = debounce(() => {
    if (
      !quickDepositInProgress &&
      Math.abs(window.orientation as number) === 0
    ) {
      window.scrollTo(0, 0);
    }
  }, 100);

  const onDismiss = () => {
    setIsDismissed(true);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tracker.track(EVENTS.MIXPANEL_IN_GAME_SWIPEUP_DISMISSED);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      /**
       * 1px diff is acceptable, this is a fix for zommed in
       * browsers and rounded up height fractions
       */
      const deviceNotInFullScreenMode =
        Math.abs(window.innerHeight - (measure?.clientHeight || 0)) > 30;
      // don't resize body when quick-deposit is displayed
      if (quickDepositInProgress) {
        return;
      }
      if (deviceNotInFullScreenMode) {
        if (!showSwipePanel) {
          setShowSwipePanel(true);
          expandBody();
        }
      } else {
        if (showSwipePanel) {
          setShowSwipePanel(false);
          shrinkBody();
        }
      }
    }, 300);
    /**
     * This prevents the situation when game content (resized to window.innerHeight)
     * is smaller than available viewport, (they are different when browsers toolbars are on)
     * and player is able to scroll a game up a bit by dragging vertically top or bottom bar (playOkay, spain)
     * and then game stays like that and you can't do anything about it because usually game canvas prevents default
     * scroll behavior, thus you can't scroll down anymore, because now you only see the game content
     */
    window.addEventListener("scroll", debouncedScrollToTop);
    return () => {
      window.removeEventListener("scroll", debouncedScrollToTop);

      clearInterval(interval);
    };
  });
  const shouldShowSwipePanel =
    (gameProviderModel as any).swipeUpToPlayPanelPossible &&
    swipeUpPanelEnabled &&
    isMobile &&
    showSwipePanel &&
    !quickDepositInProgress &&
    !isNative &&
    !isDismissed;
  return (
    <div
      ref={heightContainer}
      className={classNames("u-width--full", "u-height--full")}
    >
      <SwipeUpPanelContainer
        {...{ shouldShowSwipePanel, fullScreenElement, onDismiss }}
      />
      {children}
    </div>
  );
};
