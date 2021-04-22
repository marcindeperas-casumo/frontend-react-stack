import Flex from "@casumo/cmp-flex";
import { ButtonInverted } from "@casumo/cmp-button";
import React from "react";
import { isMobile } from "Components/ResponsiveLayout";
import { supportsTogglingFullscreen } from "Components/FullscreenView";
import HandSymbol from "./icons/hand.svg";
import type { TSwipeUpTranslations } from "./SwipeUpPanelContainer";

const onSwipePanelClick = (element: HTMLElement | null) => {
  if (element && supportsTogglingFullscreen(element) && isMobile) {
    element.requestFullscreen();
  }
};

export const SwipeUpPanel = ({
  fullScreenElement,
  onDismiss,
  t,
  loading,
}: {
  fullScreenElement: HTMLElement | undefined;
  onDismiss: () => void;
  t: TSwipeUpTranslations;
  loading: boolean;
}) => {
  const supportFullScreen = supportsTogglingFullscreen(fullScreenElement);

  return (
    <div className="c-game-page__swipe-panel u-zindex--modal u-width--screen o-position--absolute">
      <Flex
        justify="center"
        direction="vertical"
        align="center"
        className="u-width--full u-height--full"
      >
        {supportFullScreen ? (
          <Flex.Item
            onClick={() => onSwipePanelClick(fullScreenElement)}
            className="text-white"
          >
            {!loading && t.tapToFullscreenText}
          </Flex.Item>
        ) : (
          <React.Fragment>
            <Flex
              justify="center"
              direction="vertical"
              align="center"
              className="c-game-page__swipeup-details o-flex__item-align--center o-flex__block o-flex__item--no-shrink"
            >
              <Flex.Item className="c-game-page__swipeup-icon-container o-position--relative">
                <HandSymbol className="c-game-page__swipe-hand-symbol u-width--5xlg u-height--5xlg" />
              </Flex.Item>
              <Flex.Item className="c-game-page__swipeup-text-container text-white">
                {!loading && t.swipeUpText}
              </Flex.Item>
            </Flex>
            <Flex.Item className="u-padding--md">
              <ButtonInverted size="sm" onClick={onDismiss} className="">
                {!loading && t.dismissText}
              </ButtonInverted>
            </Flex.Item>
          </React.Fragment>
        )}
      </Flex>
    </div>
  );
};
