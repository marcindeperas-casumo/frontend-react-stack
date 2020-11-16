//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { ButtonInverted } from "@casumo/cmp-button";
import { isMobile } from "Components/ResponsiveLayout";
import { supportsTogglingFullscreen } from "Components/FullscreenView";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import HandSymbol from "./icons/hand.svg";

const onSwipePanelClick = (element: ?HTMLElement) => {
  if (element && supportsTogglingFullscreen(element) && isMobile) {
    element.requestFullscreen();
  }
};

export const SwipeUpPanel = ({
  fullScreenElement,
  onDismiss,
}: {
  fullScreenElement: ?HTMLElement,
  onDismiss: () => void,
}) => {
  const supportFullScreen = false; //supportsTogglingFullscreen(fullScreenElement);
  const { t, loading } = useTranslationsGql({
    swipeUpText: "root:mobile.game-launch:fields.swipe_up_text",
    tapToFullscreenText:
      "root:mobile.game-launch:fields.tap_to_fullscreen_text",
    dismissText: "root:mobile.game-launch:fields.dismiss_text",
  });

  return (
    <div className="c-game-page__swipe-panel u-width--screen u-position-absolute">
      <Flex
        justify="center"
        direction="vertical"
        align="center"
        className="u-width--full u-height--full"
      >
        {supportFullScreen ? (
          <Flex.Item
            onClick={() => onSwipePanelClick(fullScreenElement)}
            className="t-color-white"
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
              <Flex.Item className="c-game-page__swipeup-icon-container u-position-relative">
                <HandSymbol className="c-game-page__swipe-hand-symbol u-width--5xlg u-height--5xlg" />
              </Flex.Item>
              <Flex.Item className="c-game-page__swipeup-text-container t-color-white">
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
