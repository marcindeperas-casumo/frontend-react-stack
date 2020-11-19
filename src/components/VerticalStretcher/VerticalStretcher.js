//@flow

import React, { useEffect, useRef, useState } from "react";
import type { Element } from "react";
import classNames from "classnames";
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

export const VerticalStretcher = ({
  children,
  swipeUpPanelEnabled = true,
  gameProviderModel,
  fullScreenElement = document.body,
}: Props) => {
  const heightContainer = useRef(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showSwipePanel, setShowSwipePanel] = useState(false);
  const [staticHeight, setStaticHeight] = useState(false);
  const quickDepositInProgress = Boolean(
    useSelector(getSelectedQuickDepositMethod)
  );
  const measure = document.getElementById("height-measure");
  const isNative = isNativeByUserAgent();

  const debouncedScrollToTop = debounce(() => {
    if (!quickDepositInProgress) {
      window.scrollTo(0, 0);
    }
  }, 100);

  const debounceResizeGame = debounce(() => {
    gameProviderModel.fitToParentSize();
  }, 500);

  const matchContainerHeight = () => {
    if (quickDepositInProgress) {
      return;
    }

    debouncedScrollToTop();

    if (heightContainer.current) {
      /**
       * So far this is the only way i've found which solves the problem
       * of browser toolbars overlaying game content when they appear.
       */

      /* eslint-disable-next-line fp/no-mutation */
      heightContainer.current.style.height = `${window.innerHeight}px`;
      setStaticHeight(true);
    }
  };

  const onDismiss = () => {
    setIsDismissed(true);
    matchContainerHeight();
    debounceResizeGame();
  };

  useEffect(() => {
    gameProviderModel.fitToParentSize();

    const interval = setInterval(() => {
      const deviceNotInFullScreenMode =
        window.innerHeight < measure?.clientHeight;

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
    window.addEventListener("resize", debounceResizeGame);
    window.addEventListener("orientationchange", debounceResizeGame);

    return () => {
      window.removeEventListener("scroll", debouncedScrollToTop);
      window.removeEventListener("resize", debounceResizeGame);
      window.removeEventListener("orientationchange", debounceResizeGame);
      clearInterval(interval);
    };
  });

  const shouldShowSwipePanel =
    gameProviderModel.swipeUpToPlayPanelPossible &&
    swipeUpPanelEnabled &&
    isMobile &&
    showSwipePanel &&
    !quickDepositInProgress &&
    !isNative &&
    !isDismissed;

  return (
    <div
      ref={heightContainer}
      className={classNames("u-width--full", !staticHeight && "u-height--full")}
    >
      {shouldShowSwipePanel && (
        <SwipeUpPanel {...{ fullScreenElement, onDismiss }} />
      )}
      {children}
    </div>
  );
};
