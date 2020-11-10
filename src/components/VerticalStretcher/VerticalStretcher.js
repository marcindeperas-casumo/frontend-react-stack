//@flow

import React, { useEffect, useRef, useState } from "react";
import type { Element } from "react";
import debounce from "lodash.debounce";
import Flex from "@casumo/cmp-flex";
import { isMobile } from "Components/ResponsiveLayout";
import { isNativeByUserAgent } from "GameProviders";
import { supportsTogglingFullscreen } from "Components/FullscreenView";
import type { GameProviderModel } from "GameProviders";
import { SwipeUpMessageText, TapToFullscreenText } from "./messageText";
import HandSymbol from "./icons/hand.svg";
import "./VerticalStretcher.scss";

export type Props = {
  children?: Element<*>,
  swipeUpPanelEnabled: boolean,
  gameProviderModel: GameProviderModel,
  fullScreenElement: ?HTMLElement,
};

const onSwipePanelClick = (element: ?HTMLElement) => {
  if (element && supportsTogglingFullscreen(element) && isMobile) {
    element.requestFullscreen();
  }
};

export const VerticalStretcher = ({
  children,
  swipeUpPanelEnabled = true,
  gameProviderModel,
  fullScreenElement = document.body,
}: Props) => {
  const heightContainer = useRef(null);
  const [showSwipePanel, setShowSwipePanel] = useState(true);
  const measure = document.getElementById("height-measure");
  const isNative = isNativeByUserAgent();

  const expandBody = () => {
    if (document.body) {
      /* eslint-disable-next-line fp/no-mutation */
      document.body.style.height = "calc(100vh + 100px)";
    }
  };

  const shrinkBody = () => {
    if (document.body) {
      /* eslint-disable-next-line fp/no-mutation */
      document.body.style.height = "100vh";
    }
  };

  useEffect(() => {
    const debouncedScrollToTop = debounce(() => {
      window.scrollTo(0, 0);
    }, 100);

    const matchContainerHeight = () => {
      if (heightContainer.current) {
        /**
         * So far this is the only way i've found which solves the problem
         * of browser toolbars overlaying game content when they appear.
         */

        /* eslint-disable-next-line fp/no-mutation */
        heightContainer.current.style.height = `${window.innerHeight}px`;
      }
    };

    matchContainerHeight();

    const interval = setInterval(() => {
      const deviceNotInFullScreenMode =
        window.innerHeight < measure?.clientHeight;

      if (deviceNotInFullScreenMode) {
        setShowSwipePanel(true);
        expandBody();
      } else {
        setShowSwipePanel(false);
        shrinkBody();
      }
    }, 1);

    /**
     * This prevents the situation when game content (resized to window.innerHeight)
     * is smaller than available viewport, (they are different when browsers toolbars are on)
     * and player is able to scroll a game up a bit by dragging vertically top or bottom bar (playOkay, spain)
     * and then game stays like that and you can't do anything about it because usually game canvas prevents default
     * scroll behavior, thus you can't scroll down anymore, because now you only see the game content
     */
    window.addEventListener("scroll", debouncedScrollToTop);
    window.addEventListener("resize", matchContainerHeight);

    return () => {
      window.removeEventListener("scroll", debouncedScrollToTop);
      window.removeEventListener("resize", matchContainerHeight);
      clearInterval(interval);
    };
  });

  const shouldShowSwipePanel =
    gameProviderModel.swipeUpToPlayPanelPossible &&
    swipeUpPanelEnabled &&
    isMobile &&
    !isNative &&
    showSwipePanel;

  return (
    <div ref={heightContainer} className="u-width--full">
      {shouldShowSwipePanel && (
        <div className="c-game-page__swipe-panel u-width--screen u-position-absolute">
          <Flex
            justify="center"
            direction="vertical"
            align="center"
            className="c-game-page__swipeup-details u-width--full u-height--screen"
            onClick={() => onSwipePanelClick(fullScreenElement)}
          >
            {supportsTogglingFullscreen(fullScreenElement) ? (
              <Flex.Item className="t-color-white">
                <TapToFullscreenText />
              </Flex.Item>
            ) : (
              <React.Fragment>
                <Flex.Item className="c-game-page__swipeup-icon-container u-position-relative">
                  <HandSymbol className="c-game-page__swipe-hand-symbol u-width--5xlg u-height--5xlg" />
                </Flex.Item>
                <Flex.Item className="c-game-page__swipeup-text-container t-color-white">
                  <SwipeUpMessageText />
                </Flex.Item>
              </React.Fragment>
            )}
          </Flex>
        </div>
      )}
      {children}
    </div>
  );
};
