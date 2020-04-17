//@flow

import React, { useEffect, useRef, useState } from "react";
import type { Element } from "react";
import debounce from "lodash.debounce";
import { isNativeByUserAgent } from "GameProviders";

export type Props = {
  children?: Element<*>,
  swipeToFillAvailable: boolean,
};

export const VerticalStretcher = ({
  children,
  swipeToFillAvailable = true,
}: Props) => {
  const heightContainer = useRef(null);
  const [showSwipePanel, setShowSwipePanel] = useState(false);
  const [controllScroll, setControllScroll] = useState(true);

  const isNative = isNativeByUserAgent();

  useEffect(() => {
    const debouncedScrollToTop = debounce(() => {
      if (controllScroll) {
        window.scrollTo(0, 0);
      }
    }, 50);

    const interval = setInterval(() => {
      if (heightContainer.current && document.body) {
        /**
         * So far this is the only way i've found which solves the problem
         * of browser toolbars overlaying game content when they appear.
         */
        /* eslint-disable-next-line fp/no-mutation */
        heightContainer.current.style.height = `${window.innerHeight}px`;

        /**
         * This is just called here to trigger resize event which causes
         * game container to match size of it's parent after changing
         * top-lvl parent dimensions
         */
        window.dispatchEvent(new Event("resize"));

        /**
         * swipePanel allows to force player to go fullscreen to play the game
         * when toolbars are being shown and they are eating part of the screen
         */
        if (window.innerHeight < document.body?.clientHeight) {
          setShowSwipePanel(true);
          setControllScroll(false);
        } else {
          setShowSwipePanel(false);
          setControllScroll(true);
        }
      }
    }, 100);

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

  return (
    <div ref={heightContainer} className="u-width--full">
      {swipeToFillAvailable && !isNative && showSwipePanel && (
        <div className="c-game-page__swipe-panel">
          <div className="o-flex u-width--full u-height--screen">
            <div className="t-color-gainsboro u-width--full u-text-align-center o-flex__item-align--center">
              Swipe up to play
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
