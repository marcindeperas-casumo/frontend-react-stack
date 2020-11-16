//@flow

import React, { useEffect, useRef, useState } from "react";
import type { Element } from "react";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { getSelectedQuickDepositMethod } from "Models/payments/payments.selectors";
import { isMobile } from "Components/ResponsiveLayout";
import { isNativeByUserAgent } from "GameProviders";
import type { GameProviderModel } from "GameProviders";
import { SwipeUpPanel } from "./SwipeUpPanel";
import "./VerticalStretcher.scss";

export type Props = {
  children?: Element<*>,
  swipeUpPanelEnabled: boolean,
  gameProviderModel: GameProviderModel,
  fullScreenElement: ?HTMLElement,
};

export const VerticalStretcher = ({
  children,
  swipeUpPanelEnabled = true,
  gameProviderModel,
  fullScreenElement = document.body,
}: Props) => {
  const heightContainer = useRef(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showSwipePanel, setShowSwipePanel] = useState(true);
  const selectedPaymentMethod = useSelector(getSelectedQuickDepositMethod);
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

  const onDismiss = () => {
    setIsDismissed(true);
  };

  useEffect(() => {
    const debouncedScrollToTop = debounce(() => {
      window.scrollTo(0, 0);
    }, 100);

    const matchContainerHeight = () => {
      debouncedScrollToTop();

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
    showSwipePanel &&
    !selectedPaymentMethod && //prevent showing panel when typing in CVV code
    !isNative &&
    !isDismissed;

  return (
    <div ref={heightContainer} className="u-width--full">
      {shouldShowSwipePanel && (
        <SwipeUpPanel {...{ fullScreenElement, onDismiss }} />
      )}
      {children}
    </div>
  );
};
